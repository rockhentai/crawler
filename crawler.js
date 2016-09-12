var Crawler = require('crawler');
var jsdom = require('jsdom');
var utils = require('./utils');

var current_book = {};

var c = new Crawler({
  jQuery:jsdom,
  maxConnections:100,
  forceUTF8:true,
  callback:function(error,result,$) {
    var urls = $('.booklist span a');
    //console.log(urls);

    current_book.title = 'zanghaihua';
    current_book.author = '南派三叔';
    //current_book.update_time = $('#info p').eq(2).text();
    //current_book.latest_chapter = $('#info p').eq(3).html();
    //current_book.info = $('#intro').html();
    current_book.chapters = [];

    for(var i=0;i<urls.length;i++) {
      var url = urls[i];
      var _url = $(url).attr('href') + "";
      //var num = _url.match(/\d+/)[0];
      var num = i;
      var title = $(url).text();

      current_book.chapters.push({
        num:num,
        title:title,
        url:_url
      });
      one(current_book.chapters[i]);
    }
    //console.log(current_book);
    utils.mkdir(current_book.title);
    utils.write_config(current_book);
    //one(current_book.chapters[0]);
  }
});

function one(chapter) {
  console.log(chapter);
  c.queue([{
    //uri:'www.anghaihua.org/' + chapter.num + '.html',
    uri:chapter.url,
    jQuery:jsdom,
    forceUTF8:true,
    callback:function(err,result,$) {
      var content = $('#BookText').html();
      //console.log(content);
      utils.write_chapter(chapter,content);
      //process.exit();
    }
  }]);
}

function start() {
  c.queue('http://www.zanghaihua.org/');
}
start();

/**
var chapter = {
  num:'619',
  title:'老九门 陈皮阿四番外 31',
  url:'http://www.zanghaihua.org/619.html'
}
one(chapter);
**/
//c.queue('http://www.zanghaihua.org/');
