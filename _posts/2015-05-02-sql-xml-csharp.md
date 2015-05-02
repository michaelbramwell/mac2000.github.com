---
layout: post
title: Dealing with XML in SQL Server and C#
tags: [sql, xml, csharp]
---

Did you know that you can retrieve hierarchical data from SQL?

There is huge amount ot tips how to get comma separated lists from SQL server, like this:

    SELECT
    P.PostId,
    P.Title,
    STUFF((
        SELECT DISTINCT ',' + C.Name
        FROM PostCategories AS PC
        INNER JOIN Categories AS C ON PC.CategoryId = C.CategoryId
        WHERE PC.PostId = P.PostId
        FOR XML PATH(''), TYPE).value('.', 'NVARCHAR(MAX)'), 1, 1, '') AS Categories
    FROM Posts AS P

which will return something like this:

PostId | Title             | Categories
-----: | ----------------- | ----------
1      | Composer tutorial | IT
2      | Going agile       | IT,Management
3      | XSL your XML      | IT

**I am wondering why do I need convert nice XML from inner select into comma separated list string to explode it later in C# at all?!**

Sample database
---------------

We are going to build following database:

![Database](http://yuml.me/e8e4027f.svg)

Here is sample SQL on which tests will be made:

    -- Cleanup
    IF OBJECT_ID('dbo.PostCategories', 'U') IS NOT NULL DROP TABLE dbo.PostCategories
    GO

    IF OBJECT_ID('dbo.Posts', 'U') IS NOT NULL DROP TABLE dbo.Posts
    GO

    IF OBJECT_ID('dbo.Authors', 'U') IS NOT NULL DROP TABLE dbo.Authors
    GO

    IF OBJECT_ID('dbo.Categories', 'U') IS NOT NULL DROP TABLE dbo.Categories
    GO

    -- Schema
    CREATE TABLE dbo.Authors (
        AuthorId INT IDENTITY(1, 1) PRIMARY KEY,
        FullName NVARCHAR(100) NOT NULL,
        BirthDate DATE
    )
    GO

    CREATE TABLE dbo.Posts (
        PostId INT IDENTITY(1, 1) PRIMARY KEY,
        Title NVARCHAR(100) NOT NULL,
        AuthorId INT NOT NULL,
        CONSTRAINT FK_Posts_Authors FOREIGN KEY (AuthorId) REFERENCES dbo.Authors (AuthorId) ON DELETE CASCADE ON UPDATE CASCADE
    )
    GO

    CREATE TABLE dbo.Categories (
        CategoryId INT IDENTITY(1, 1) PRIMARY KEY,
        Name NVARCHAR(100) NOT NULL
    )
    GO

    CREATE TABLE dbo.PostCategories (
        PostId INT NOT NULL,
        CategoryId INT NOT NULL,
        CONSTRAINT FK_PostCategory_Posts FOREIGN KEY (PostId) REFERENCES dbo.Posts (PostId) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT FK_PostCategory_Categories FOREIGN KEY (CategoryId) REFERENCES dbo.Categories (CategoryId) ON DELETE CASCADE ON UPDATE CASCADE
    )
    GO

    --Data
    SET IDENTITY_INSERT dbo.Authors ON
    INSERT INTO Authors (AuthorId, FullName, BirthDate) VALUES
        (1, 'Alexandr Marchenko', '1985-03-11'),
        (2, 'Maria Marchenko', '1988-06-11')
    SET IDENTITY_INSERT dbo.Authors OFF
    GO

    SET IDENTITY_INSERT dbo.Categories ON
    INSERT INTO Categories (CategoryId, Name) VALUES (1, 'IT'), (2, 'Management')
    SET IDENTITY_INSERT dbo.Categories OFF
    GO

    SET IDENTITY_INSERT dbo.Posts ON
    INSERT INTO Posts (PostId, Title, AuthorId) VALUES 
        (1, 'Composer tutorial', 1), 
        (2, 'Going agile', 2),
        (3, 'XSL your XML', 1)
    SET IDENTITY_INSERT dbo.Posts OFF
    GO

    INSERT INTO PostCategories (PostId, CategoryId) VALUES (1, 1), (2, 1), (2, 2), (3, 1)
    GO

[yuml.me](http://yuml.me/) definition:

    [Authors|AuthorId:int;FullName:string;BirthDate:date]
    [Posts|PostId:int;Title:string;AuthorId:int]
    [Categories|CategoryId:int;Name:string]
    [PostCategories|PostId:int;CategoryId:int]
    [Authors]1->*[Posts]
    [Posts]1->*[PostCategories]
    [Categories]1->*[PostCategories]

Map SQL query XML result to C# object
-------------------------------------

Suppose we have following class:

    public class Post
    {
        public int PostId { get; set; }
        public string Title { get; set; }
        public int AuthorId { get; set; }
    }

SQL Query: `SELECT P.* FROM Posts AS P FOR XML PATH('Post'), ROOT('ArrayOfPost')` will return XML:

    <ArrayOfPost>
      <Post>
        <PostId>1</PostId>
        <Title>Composer tutorial</Title>
        <AuthorId>1</AuthorId>
      </Post>
      <Post>
        <PostId>2</PostId>
        <Title>Going agile</Title>
        <AuthorId>2</AuthorId>
      </Post>
      <Post>
        <PostId>3</PostId>
        <Title>XSL your XML</Title>
        <AuthorId>1</AuthorId>
      </Post>
    </ArrayOfPost>

**Notice** how we named root node of xml as `ArrayOfPost` it is used by C# xml serializer while deserializing XML into objects to determine that we wish to get `List<Post>`

Here is how to deserialize that query into `List<Post>`:

    XmlSerializer xmlSerializer = new XmlSerializer(typeof(List<Post>));
    using (var connection = new SqlConnection((new SqlConnectionStringBuilder { InitialCatalog = "Play", IntegratedSecurity = true }).ConnectionString))
    {
        using (var command = new SqlCommand("SELECT P.* FROM Posts AS P FOR XML PATH('Post'), ROOT('ArrayOfPost')", connection))
        {
            connection.Open();
            using (var reader = command.ExecuteXmlReader())
            {
                foreach (var post in (List<Post>)xmlSerializer.Deserialize(reader))
                {
                    Console.WriteLine("Id: {0:N0}, Title: {1}", post.PostId, post.Title);
                }
            }
        }
    }

Joining objects together
------------------------

Lets modify our object to be like this:

    public class Post
    {
        public int PostId { get; set; }
        public string Title { get; set; }
        public Author Author { get; set; }
    }

Id did replace `public int AuthorId { get; set; }` with `public Author Author { get; set; }`

Now we are going to ask our database for more information with this query:

    SELECT
    P.PostId,
    P.Title,
    (SELECT * FROM Authors AS A WHERE A.AuthorId = P.AuthorId FOR XML PATH(''), TYPE) AS Author 
    FROM Posts AS P
    FOR XML PATH('Post'), ROOT('ArrayOfPost')

which will return:

    <ArrayOfPost>
      <Post>
        <PostId>1</PostId>
        <Title>Composer tutorial</Title>
        <Author>
          <AuthorId>1</AuthorId>
          <FullName>Alexandr Marchenko</FullName>
          <BirthDate>1985-03-11</BirthDate>
        </Author>
      </Post>
      <Post>
        <PostId>2</PostId>
        <Title>Going agile</Title>
        <Author>
          <AuthorId>2</AuthorId>
          <FullName>Maria Marchenko</FullName>
          <BirthDate>1988-06-11</BirthDate>
        </Author>
      </Post>
      <Post>
        <PostId>3</PostId>
        <Title>XSL your XML</Title>
        <Author>
          <AuthorId>1</AuthorId>
          <FullName>Alexandr Marchenko</FullName>
          <BirthDate>1985-03-11</BirthDate>
        </Author>
      </Post>
    </ArrayOfPost>

And mapping from previous example should still work (just make sure to chage query):

    XmlSerializer xmlSerializer = new XmlSerializer(typeof(List<Post>));
    using (var connection = new SqlConnection((new SqlConnectionStringBuilder { InitialCatalog = "Play", IntegratedSecurity = true }).ConnectionString))
    {
        using (var command = new SqlCommand("SELECT P.PostId, P.Title, (SELECT * FROM Authors AS A WHERE A.AuthorId = P.AuthorId FOR XML PATH(''), TYPE) AS Author FROM Posts AS P FOR XML PATH('Post'), ROOT('ArrayOfPost')", connection))
        {
            connection.Open();
            using (var reader = command.ExecuteXmlReader())
            {
                foreach (var post in (List<Post>)xmlSerializer.Deserialize(reader))
                {
                    Console.WriteLine("Id: {0:N0}, Title: {1}, Author: {2} ({3:yyyy\\-MM\\-dd})", post.PostId, post.Title, post.Author.FullName, post.Author.BirthDate);
                }
            }
        }
    }

will output:

    Id: 1, Title: Composer tutorial, Author: Alexandr Marchenko (1985-03-11)
    Id: 2, Title: Going agile, Author: Maria Marchenko (1988-06-11)
    Id: 3, Title: XSL your XML, Author: Alexandr Marchenko (1985-03-11)

**IT IS AWESOME!**

Joining multiple objects
------------------------

Lets modify our class again:

    public class Post
    {
        public int PostId { get; set; }
        public string Title { get; set; }
        public Author Author { get; set; }
        public string[] Categories { get; set; }
    }

Now I have added `public string[] Categories { get; set; }` notice that it is just array of strings, in following example we will join categories itself to post object.

For C# xml serializer to be able to deserialize strings array xml should look something like: `<acme><string>foo</string><string>bar</string></acme>`.

So here is modified SQL:

    SELECT
    P.*,
    (SELECT * FROM Authors AS A WHERE A.AuthorId = P.AuthorId FOR XML PATH(''), TYPE) AS Author, 
    (
        SELECT C.Name AS string
        FROM PostCategories AS PC
        INNER JOIN Categories AS C ON PC.CategoryId = C.CategoryId
        WHERE PC.PostId = P.PostId
        FOR XML PATH(''), TYPE
    ) AS Categories
    FROM Posts AS P FOR XML PATH('Post'), ROOT('ArrayOfPost')

And its ouput:

    <ArrayOfPost>
      <Post>
        <PostId>1</PostId>
        <Title>Composer tutorial</Title>
        <AuthorId>1</AuthorId>
        <Author>
          <AuthorId>1</AuthorId>
          <FullName>Alexandr Marchenko</FullName>
          <BirthDate>1985-03-11</BirthDate>
        </Author>
        <Categories>
          <string>IT</string>
        </Categories>
      </Post>
      <Post>
        <PostId>2</PostId>
        <Title>Going agile</Title>
        <AuthorId>2</AuthorId>
        <Author>
          <AuthorId>2</AuthorId>
          <FullName>Maria Marchenko</FullName>
          <BirthDate>1988-06-11</BirthDate>
        </Author>
        <Categories>
          <string>IT</string>
          <string>Management</string>
        </Categories>
      </Post>
      <Post>
        <PostId>3</PostId>
        <Title>XSL your XML</Title>
        <AuthorId>1</AuthorId>
        <Author>
          <AuthorId>1</AuthorId>
          <FullName>Alexandr Marchenko</FullName>
          <BirthDate>1985-03-11</BirthDate>
        </Author>
        <Categories>
          <string>IT</string>
        </Categories>
      </Post>
    </ArrayOfPost>

Our C# code will be able to deserialize this without changes again.

    XmlSerializer xmlSerializer = new XmlSerializer(typeof(List<Post>));
    using (var connection = new SqlConnection((new SqlConnectionStringBuilder { InitialCatalog = "Play", IntegratedSecurity = true }).ConnectionString))
    {
        using (var command = new SqlCommand("SELECT P.*, (SELECT * FROM Authors AS A WHERE A.AuthorId = P.AuthorId FOR XML PATH(''), TYPE) AS Author, (SELECT C.Name AS string FROM PostCategories AS PC INNER JOIN Categories AS C ON PC.CategoryId = C.CategoryId WHERE PC.PostId = P.PostId FOR XML PATH(''), TYPE) AS Categories FROM Posts AS P FOR XML PATH('Post'), ROOT('ArrayOfPost')", connection))
        {
            connection.Open();
            using (var reader = command.ExecuteXmlReader())
            {
                foreach (var post in (List<Post>)xmlSerializer.Deserialize(reader))
                {
                    Console.WriteLine(
                        "[{0:N0}] {1} by {2} ({3:yyyy\\-MM\\-dd}) in {4}",
                        post.PostId,
                        post.Title,
                        post.Author.FullName,
                        post.Author.BirthDate,
                        string.Join(", ", post.Categories)
                    );
                }
            }
        }
    }

Will output:

    [1] Composer tutorial by Alexandr Marchenko (1985-03-11) in IT
    [2] Going agile by Maria Marchenko (1988-06-11) in IT, Management
    [3] XSL your XML by Alexandr Marchenko (1985-03-11) in IT

Joining List of objects
-----------------------

Here is last example:

    public class Post
    {
        public int PostId { get; set; }
        public string Title { get; set; }
        public Author Author { get; set; }
        public Category[] Categories { get; set; }
    }

I did replace `public string[] Categories { get; set; }` with `public Category[] Categories { get; set; }` so now we wanna get list of categories rather than list of category names.

Here is SQL query:

    SELECT
    P.*,
    (SELECT * FROM Authors AS A WHERE A.AuthorId = P.AuthorId FOR XML PATH(''), TYPE) AS Author, 
    (
        SELECT *
        FROM PostCategories AS PC
        INNER JOIN Categories AS C ON PC.CategoryId = C.CategoryId
        WHERE PC.PostId = P.PostId
        FOR XML PATH('Category'), TYPE
    ) AS Categories
    FROM Posts AS P FOR XML PATH('Post'), ROOT('ArrayOfPost')

And its output:

    <ArrayOfPost>
      <Post>
        <PostId>1</PostId>
        <Title>Composer tutorial</Title>
        <AuthorId>1</AuthorId>
        <Author>
          <AuthorId>1</AuthorId>
          <FullName>Alexandr Marchenko</FullName>
          <BirthDate>1985-03-11</BirthDate>
        </Author>
        <Categories>
          <Category>
            <PostId>1</PostId>
            <CategoryId>11</CategoryId>
            <Name>IT</Name>
          </Category>
        </Categories>
      </Post>
      <Post>
        <PostId>2</PostId>
        <Title>Going agile</Title>
        <AuthorId>2</AuthorId>
        <Author>
          <AuthorId>2</AuthorId>
          <FullName>Maria Marchenko</FullName>
          <BirthDate>1988-06-11</BirthDate>
        </Author>
        <Categories>
          <Category>
            <PostId>2</PostId>
            <CategoryId>11</CategoryId>
            <Name>IT</Name>
          </Category>
          <Category>
            <PostId>2</PostId>
            <CategoryId>22</CategoryId>
            <Name>Management</Name>
          </Category>
        </Categories>
      </Post>
      <Post>
        <PostId>3</PostId>
        <Title>XSL your XML</Title>
        <AuthorId>1</AuthorId>
        <Author>
          <AuthorId>1</AuthorId>
          <FullName>Alexandr Marchenko</FullName>
          <BirthDate>1985-03-11</BirthDate>
        </Author>
        <Categories>
          <Category>
            <PostId>3</PostId>
            <CategoryId>11</CategoryId>
            <Name>IT</Name>
          </Category>
        </Categories>
      </Post>
    </ArrayOfPost>

**Notice** that we are named our node `Categories` and not `ArrayOfCategories` it will work like this.

C# code:

    XmlSerializer xmlSerializer = new XmlSerializer(typeof(List<Post>));
    using (var connection = new SqlConnection((new SqlConnectionStringBuilder { InitialCatalog = "Play", IntegratedSecurity = true }).ConnectionString))
    {
        using (var command = new SqlCommand("SELECT P.*, (SELECT * FROM Authors AS A WHERE A.AuthorId = P.AuthorId FOR XML PATH(''), TYPE) AS Author, (SELECT * FROM PostCategories AS PC INNER JOIN Categories AS C ON PC.CategoryId = C.CategoryId WHERE PC.PostId = P.PostId FOR XML PATH('Category'), TYPE ) AS Categories FROM Posts AS P FOR XML PATH('Post'), ROOT('ArrayOfPost')", connection))
        {
            connection.Open();
            using (var reader = command.ExecuteXmlReader())
            {
                foreach (var post in (List<Post>)xmlSerializer.Deserialize(reader))
                {
                    Console.WriteLine(
                        "[{0:N0}] {1} by {2} ({3:yyyy\\-MM\\-dd}) in {4}",
                        post.PostId,
                        post.Title,
                        post.Author.FullName,
                        post.Author.BirthDate,
                        string.Join(", ", post.Categories.Select(c => c.Name))
                    );
                }
            }
        }
    }

output will be exactly the same as in previous example.

Workflow
--------

If you ever got into troubles all you need to do is to try serialize/deserialize objects by hand, look at produced XML and try to reproduce it in SQL query

**Serialize C# object to XML**

    XmlSerializer xmlSerializer = new XmlSerializer(typeof(Post));
    StringBuilder stringBuilder = new StringBuilder();
    using (var xmlWriter = XmlWriter.Create(stringBuilder))
    {
        xmlSerializer.Serialize(xmlWriter, new Post { PostId = 1, Title = "Composer tutorial", AuthorId = 1 });
        Console.WriteLine(stringBuilder.ToString());
    }

will output:

    <?xml version="1.0" encoding="utf-16"?>
    <Post xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
            <PostId>1</PostId>
            <Title>Composer tutorial</Title>
            <AuthorId>1</AuthorId>
    </Post>

**Deserialize C# object from XML**

    using (TextReader reader = new StringReader("<?xml version=\"1.0\" encoding=\"utf-16\"?><Post><PostId>1</PostId><Title>Composer tutorial</Title><AuthorId>1</AuthorId></Post>"))
    {
        var post = (Post)xmlSerializer.Deserialize(reader);
        Console.WriteLine("Id: {0:N0}, Title: {1}, Author: {2:N0}", post.PostId, post.Title, post.AuthorId);
    }

Will output:

    Id: 1, Title: Composer tutorial, Author: 1

**Notice** that we are ommited XML namespaces as they seems to be not required

one more addition:

Saving C# object to SQL via XML
-------------------------------

Stored procedure template:

    CREATE PROCEDURE dbo.SavePost @post XML
    AS
    BEGIN
        MERGE dbo.Posts AS target
        USING (
            SELECT
                Post.value('(PostId/text())[1]','INT') AS PostId,
                Post.value('(Title/text())[1]','NVARCHAR(100)') AS Title,
                Post.value('(AuthorId/text())[1]','INT') AS AuthorId
            FROM
                @post.nodes('/Post')AS TEMPTABLE(Post)
        ) AS source (PostId, Title, AuthorId)
        ON (target.PostId = source.PostId)
        WHEN MATCHED THEN 
            UPDATE SET Title = source.Title, AuthorId = source.AuthorId
        WHEN NOT MATCHED THEN
            INSERT (Title, AuthorId)
            VALUES (source.Title, source.AuthorId);
    END
    GO

C# code sample:

    var xmlSerializer = new XmlSerializer(typeof(Post));
    var stringBuilder = new StringBuilder();
    using (var xmlWriter = XmlWriter.Create(stringBuilder))
    {
        xmlSerializer.Serialize(xmlWriter, new Post { PostId = 2, Title = "Stored Procedure XML", AuthorId = 1 });
    }
    Console.WriteLine(stringBuilder.ToString());

    using (var connection = new SqlConnection((new SqlConnectionStringBuilder { InitialCatalog = "Play", IntegratedSecurity = true }).ConnectionString))
    {
        using (var command = new SqlCommand("SavePost", connection) { CommandType = System.Data.CommandType.StoredProcedure })
        {
            command.Parameters.Add(new SqlParameter("@post", stringBuilder.ToString()));
            connection.Open();
            var numberOfAffectedRows = command.ExecuteNonQuery();
            Console.WriteLine("Number of affected rows: {0:N0}", numberOfAffectedRows);
        }
    }

Example from: http://www.aspsnippets.com/Articles/Pass-XML-parameter-to-Stored-Procedure-in-C-and-VBNet.aspx

    CREATE PROCEDURE [dbo].[InsertXML]
    @xml XML
    AS
    BEGIN
          SET NOCOUNT ON;
     
          INSERT INTO CustomerDetails
          SELECT
          Customer.value('@Id','INT') AS Id, --ATTRIBUTE
          Customer.value('(Name/text())[1]','VARCHAR(100)') AS Name, --TAG
          Customer.value('(Country/text())[1]','VARCHAR(100)') AS Country --TAG
          FROM
          @xml.nodes('/Customers/Customer')AS TEMPTABLE(Customer)
    END

demonstrates how to retrieve atributes from xml

**Notice** that you can return whole saved object from stored procedure and deserialize it in C#, also you can pass as complex object as you wish.

In this [article](https://www.simple-talk.com/blogs/2012/01/05/using-xml-to-pass-lists-as-parameters-in-sql-server/) there is sample of passing lists into stored procedure.

In our case it can be something like this:

    DECLARE @post XML
    SET @post = '<Post xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
    <PostId>4</PostId>
    <Title>1111Stored Procedure XML Parameter</Title>
    <AuthorId>1</AuthorId>
    <Categories>
        <string>IT</string>
        <string>Accounting</string>
    </Categories>
    </Post>'

    SELECT Category.value('.', 'NVARCHAR(100)') AS Category
    FROM @post.nodes('/Post/Categories/string/text()') AS TEMPTABLE(Category)

Which will return:

    Category
    --------
    IT
    Accounting

This can be used to update multiple entites in database in one call.
