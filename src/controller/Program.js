var program = require('../model').Program;
var tag = require('../model').tag;

function rdColor() {
  var color = '';
  var rd = Math.random();
  if (rd < 0.25) {
    color = 'green-tag';
  } else if (rd < 0.5) {
    color = 'yellow-tag';
  } else if (rd < 0.75) {
    color = 'blue-tag';
  } else if (rd < 1) {
    color = 'my-tag';
  }
  return color;
}

exports.index = function(req, res, next) {
  var queryObj = {}
  if (req.query.tag) {
    queryObj.category = req.query.tag;
  }
  if (!req.query.size) {
    var size = 5;
  } else {
    var size = Number(req.query.size);
  }
  if (!req.query.page) {
    var page = 1;
  } else {
    var page = Number(req.query.page);
  }
  program
    .find(queryObj)
    .limit(size)
    .skip((page - 1) * size)
    .exec(function(err, docs) {
      // var totalPage = Math.floor(docs.length/size);
      // if(docs.length%size !== 0) {
      //   totalPage += 1;
      // }
      // if(page>totalPage){
      //   page = totalPage;
      // }
      if (err) {
        console.error(err)
      } else {
        program.find(queryObj,function(err, result) {
          jsonArray = {
            data: docs,
            total: result.length
          };
          docs.forEach(el => {
            if (el.content) {
              el.content = el.content.replace(/<[^>]+>/g, "").slice(0, 300).trim();
            }
          })
          tag.find({}, function(err, tags) {
            tags.forEach(function(el) {
              el.color = rdColor();
            })
            res.render('program/index', {
              one: {
                title: '随笔'
              },
              program: jsonArray,
              tags: tags
            });
          });
        })
      }

    })
  // .sort({'date.updateAt': -1})
  // .limit(15);
};

exports.showOneProgram = function(req, res, next) {
  program.findById(req.query.id, function(err, one) {
    tag.find({}, function(err, tags) {
      tags.forEach(function(el) {
        el.color = rdColor();
      })
      var queryObj = req.query.tag ? {
        category: req.query.tag
      } : {};
      program.find(queryObj, function(err, program) {
        console.log(program);
        jsonArray = {
            data: program,
            total: program.length
          };
        res.render('program/show', {
          one: one,
          program: jsonArray,
          tags: tags
        });
      }).limit(15);;
    });

  });
};