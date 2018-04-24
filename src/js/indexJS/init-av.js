{
    //初始化数据
    let APP_ID = '0i1gBxhqNiRyqAEWtWoUP287-gzGzoHsz';
    let APP_KEY = 'Xs6gnX3JTmDJumjpnLIlSXXk';

    AV.init({
        appId: APP_ID,
        appKey: APP_KEY
    });
}

//创建
/*    var TestObject = AV.Object.extend('PlayList');
 var testObject = new TestObject();
 testObject.save({
 name:'text',
 cover:'text',
 creatorId:'text',
 songs:['1','2']
 }).then(function(object) {
 alert('LeanCloud Rocks!');
 })*/