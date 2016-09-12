var fs = require('fs');
var debug = require('debug')('crawler');
//var utils = require('./utils');

exports.mkdir = function(folder) {
  var mkdirp = require('mkdirp');
  mkdirp('dist/' + folder,function(err) {
    if(err) console.log(err);
    else debug('pow!');
  });
}

exports.write_chapter = function(chapter,content) {
  //content = content.replace(/<br>/g,'\n');
  content = content.replace('<script language="javascript" type="text/javascript" src="/js/tb.js"></script>','');
  content = content.replace('<a href="http://www.zanghaihua.org/zhhshitishu/">http://www.zanghaihua.org/zhhshitishu/</a>','');
  console.log(content);
  fs.writeFile('dist/zanghaihua/' + chapter.num + '.html',content,function(err) {
    if(err) throw err;
    console.log('It\'s saved!');
  });
}

exports.write_config = function(book) {
  //mkdir(book.title);
  var content = JSON.stringify(book,null,4);
  fs.writeFile('dist/zanghaihua/book.json',content,function(err) {
    if(err) throw err;
    debug('It\'s saved!');
  })
}
