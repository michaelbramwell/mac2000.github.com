require 'rubygems'
require 'maruku'

Dir["./**/*.md"].each do |p|
    begin
        markdown = File.read(p).gsub(%r|^\s*tags\s*:\s*\[[^\]]+\]\s*$|, '')
        html = Maruku.new(markdown).to_html
    rescue
        puts p
    end
end
