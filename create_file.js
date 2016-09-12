var fs = require('fs');

function write_chapter(chapter,content) {
  content = content.replace(/<.+>/g,'\n');
  console.log(content);
  fs.writeFile('dist/i am mkdir folder/' + chapter + '.html',content,function(err) {
    if(err) throw err;
    console.log('It\'s saved!');
  });
}

write_chapter('1',content);
