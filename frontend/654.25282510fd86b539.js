"use strict";(self.webpackChunkvuathethaoCMS=self.webpackChunkvuathethaoCMS||[]).push([[654],{8654:(S,d,i)=>{i.r(d),i.d(d,{ConfigModule:()=>b});var u=i(9808),p=i(7330),m=i(8306),v=i(9646),n=i(5e3),s=i(2340),M=i(2229);let C=(()=>{class t{constructor(e){this._apiService=e}getConfig(){return this._apiService.actionGet(`${s.N.apiUrl}admin/config`)}getUpdate(e,o){return this._apiService.actionPut(`${s.N.apiUrl}admin/config/${e}`,o)}getConfigFakeData(){return this._apiService.actionGet(`${s.N.apiUrl}admin/config/fake-data`)}changeFakeData(){return this._apiService.actionPut(`${s.N.apiUrl}admin/config/fake-data`,{})}}return t.\u0275fac=function(e){return new(e||t)(n.LFG(M.Mg))},t.\u0275prov=n.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"}),t})();var c=i(1580),f=i(3075);function _(t,r){if(1&t){const e=n.EpF();n.TgZ(0,"div",1),n._UZ(1,"label",6),n.TgZ(2,"input",7),n.NdJ("ngModelChange",function(a){const g=n.CHM(e).$implicit;return n.oxw()._model[g.type]=a})("ngModelChange",function(a){const g=n.CHM(e).$implicit;return n.oxw().change(a,null==g?null:g.id,null!=g&&g.link?"link":"content")}),n.qZA()()}if(2&t){const e=r.$implicit,o=n.oxw();n.xp6(1),n.Q6J("innerText",null==e?null:e.type),n.xp6(1),n.MGl("placeholder","Nh\u1eadp t\xean ",null==e?null:e.type,""),n.Q6J("ngModel",o._model[e.type])}}const y=[{path:"",component:(()=>{class t{constructor(e,o){this._configService=e,this._toarstr=o,this._configs=new m.y,this._model={},localStorage.removeItem("fake_data")}ngOnInit(){this.getConfig(),this.getConfigFakeData()}getConfig(){this._configService.getConfig().subscribe(e=>{e.map(o=>{var a;this._model[o.type]=null!==(a=null==o?void 0:o.link)&&void 0!==a?a:null==o?void 0:o.content}),this._configs=(0,v.of)(e)})}change(e,o,a){let l={};l[a]=e,this._configService.getUpdate(o,l).subscribe(g=>{this._toarstr.success(`Thay \u0111\u1ed5i c\u1ea5u h\xecnh ${g.type.toUpperCase()} th\xe0nh c\xf4ng `,"Success")})}getConfigFakeData(){this._configService.getConfigFakeData().subscribe(e=>{this._modelConfig=!0===e?"1":"0"})}changeConfigFakeData(e){this._configService.changeFakeData().subscribe(o=>{this._toarstr.success("Thay \u0111\u1ed5i c\u1ea5u h\xecnh th\xe0nh c\xf4ng ","Success")})}}return t.\u0275fac=function(e){return new(e||t)(n.Y36(C),n.Y36(c.quB))},t.\u0275cmp=n.Xpm({type:t,selectors:[["app-config"]],decls:14,vars:4,consts:[["class","form-group mb-3",4,"ngFor","ngForOf"],[1,"form-group","mb-3"],["for","title",1,"mb-2","text-capitalize"],["fullWidth","",3,"ngModel","ngModelChange"],["value","1"],["value","0"],["for","title",1,"mb-2","text-capitalize",3,"innerText"],["id","title","type","text","nbInput","",1,"form-control",3,"placeholder","ngModel","ngModelChange"]],template:function(e,o){1&e&&(n.TgZ(0,"nb-card")(1,"nb-card-header"),n._uU(2,"C\xe0i \u0110\u1eb7t"),n.qZA(),n.TgZ(3,"nb-card-body"),n.YNc(4,_,3,3,"div",0),n.ALo(5,"async"),n.TgZ(6,"div",1)(7,"label",2),n._uU(8,"Fake Data"),n.qZA(),n.TgZ(9,"nb-select",3),n.NdJ("ngModelChange",function(l){return o._modelConfig=l})("ngModelChange",function(l){return o.changeConfigFakeData(l)}),n.TgZ(10,"nb-option",4),n._uU(11,"B\u1eadt"),n.qZA(),n.TgZ(12,"nb-option",5),n._uU(13,"T\u1eaft"),n.qZA()()()()()),2&e&&(n.xp6(4),n.Q6J("ngForOf",n.lcZ(5,2,o._configs)),n.xp6(5),n.Q6J("ngModel",o._modelConfig))},directives:[c.Asz,c.ndF,c.yKW,u.sg,f.Fj,f.JJ,f.On,c.rs,c.q51],pipes:[u.Ov],styles:[""]}),t})()}];let F=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=n.oAB({type:t}),t.\u0275inj=n.cJS({imports:[[p.Bz.forChild(y)],p.Bz]}),t})(),b=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=n.oAB({type:t}),t.\u0275inj=n.cJS({providers:[C],imports:[[u.ez,F,c.zyh,f.u5,c.IIj]]}),t})()}}]);