exports.mkdir = function(folder) {
  var mkdirp = require('mkdirp');
  mkdirp('dist/' + folder,function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log('pow!');
    }
  });
}
//mkdir('i am mkdir folder');
