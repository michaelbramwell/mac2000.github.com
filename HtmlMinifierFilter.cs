using System;
using System.IO;

namespace MinifyModule
{
    public class HtmlMinifierFilter : Stream
    {
        private readonly Stream _responseStream;
        private long _position;

        public HtmlMinifierFilter(Stream inputStream)
        {
            _responseStream = inputStream;
        }

        public override bool CanRead
        {
            get { return true; }
        }

        public override bool CanSeek
        {
            get { return true; }
        }

        public override bool CanWrite
        {
            get { return true; }
        }

        public override long Length
        {
            get { return 0; }
        }

        public override long Position
        {
            get { return _position; }
            set { _position = value; }
        }

        public override void Flush()
        {
            _responseStream.Flush();
        }

        public override int Read(byte[] buffer, int offset, int count)
        {
            return _responseStream.Read(buffer, offset, count);
        }

        public override long Seek(long offset, SeekOrigin origin)
        {
            return _responseStream.Seek(offset, origin);
        }

        public override void SetLength(long value)
        {
            _responseStream.SetLength(Length);
        }

        public override void Write(byte[] buffer, int offset, int count)
        {
            char symbol;
            bool betweenTags = true;

            for (int i = 0; i < buffer.Length; i++)
            {
                symbol = Convert.ToChar(buffer[i]);

                // find closing tag char and set marker 
                if (symbol == '>')
                {
                    betweenTags = true;
                    _responseStream.WriteByte(buffer[i]);
                    continue;
                }

                // if the marker is set and there is whitespace do not write this byte
                if (betweenTags && char.IsWhiteSpace(symbol)) continue;

                if (i > 1 && betweenTags && (Convert.ToChar(buffer[i - 1]) == ' '))
                {
                    _responseStream.WriteByte(buffer[i - 1]);
                }

                // if the char is a line break then do not write this byte
                if(symbol == '\n' || symbol == '\r') continue;

                _responseStream.WriteByte(buffer[i]);

                betweenTags = false;
            }
        }
    }
}