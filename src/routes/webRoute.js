var express = require("express");
var program = require('../controller/Program');
var static = require('../controller/Static');
var admin = require('../controller/Admin');
var auth = require('../middlewares/Auth');
var router = express.Router();

/**Router-level middleware**/
// a middleware sub-stack shows request info for any type of HTTP request to the /user/:id path
/*主页index*/
router.get('/', program.index);
// router.get('/error', index.error);
// router.get('/login', index.showLogin);
// router.post('/login', index.login);
// router.get('/register', index.showRegist);
// router.post('/register', index.regist);
// router.get('/logout', index.logout);


/*静态文章*/
router.get('/about', static.about);

/*生活感悟*/
router.get('/life', static.life);
router.get('/life/one',static.showOneLife);


/*技术杂谈*/
router.get('/program', program.index);
router.get('/program/one', program.showOneProgram);


/*技术分享*/
router.get('/skill', static.skill);
router.get('/skill/one',static.showOneSkill);

/*评论*/
router.get('/commonent', static.commonent);


/*todo:网站后台*/
router.get('/admin', admin.showLogin);
router.get('/admin/login', admin.login);

/*todo:博文修改的新增接口*/
router.get('/admin/program', auth.adminAuth, admin.programIndex);
router.get('/admin/program/add', auth.adminAuth, admin.showProgramAdd);
router.post('/admin/program/add', auth.adminAuth, admin.programAdd);
router.get('/admin/program/edit', auth.adminAuth, admin.showProgramEdit);
router.post('/admin/program/edit', auth.adminAuth, admin.programEdit);
router.get('/admin/program/del', auth.adminAuth, admin.programDel);

/*todo:博文分类*/
router.get('/admin/tag',auth.adminAuth,admin.showTags);
router.get('/admin/tag/add',auth.adminAuth,admin.showAddTags);
router.post('/admin/tag/add',auth.adminAuth,admin.addTags);
router.get('/admin/tag/edit',auth.adminAuth,admin.showEditTags);
router.post('/admin/tag/edit',auth.adminAuth,admin.editTags);
router.get('/admin/tag/del',auth.adminAuth,admin.delTag);

// 生活感悟新增接口
router.get('/admin/life', auth.adminAuth, admin.lifeIndex);
router.get('/admin/life/add', auth.adminAuth, admin.showLifeAdd);
router.post('/admin/life/add', auth.adminAuth, admin.lifeAdd);
// router.get('/admin/life.edit', auth.adminAuth, admin.lifeEdit);
// router.get('/admin/life/del', auth.adminAuth, admin.lifeDel);
//技术分享接口
router.get('/admin/skill',auth.adminAuth,admin.skill);
router.get('/admin/skill/add', auth.adminAuth, admin.showSkillAdd);
router.post('/admin/skill/add', auth.adminAuth, admin.skillAdd);

module.exports = router;
