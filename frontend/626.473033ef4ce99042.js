"use strict";(self.webpackChunkvuathethaoCMS=self.webpackChunkvuathethaoCMS||[]).push([[626],{6626:(G,b,p)=>{p.r(b),p.d(b,{PagesModule:()=>k});var g=p(9808),C=p(7330),t=p(5e3),D=p(2313),T=p(3315),y=p(9850),x=p(4135),S=p(2340),Z=p(2229);let P=(()=>{class o{constructor(e){this._apiService=e}createItemPage(e){return this._apiService.actionPost(`${S.N.apiUrl}admin/page-item`,e)}}return o.\u0275fac=function(e){return new(e||o)(t.LFG(Z.Mg))},o.\u0275prov=t.Yz7({token:o,factory:o.\u0275fac,providedIn:"root"}),o})();var c=p(1580),m=p(3075);function I(o,i){if(1&o){const e=t.EpF();t.TgZ(0,"button",3),t.NdJ("click",function(){return t.CHM(e),t.oxw().addPostItem()}),t._UZ(1,"nb-icon",4),t.qZA()}}function A(o,i){if(1&o){const e=t.EpF();t.TgZ(0,"button",3),t.NdJ("click",function(){return t.CHM(e),t.oxw(3).addPostItem()}),t._UZ(1,"nb-icon",4),t.qZA()}}function F(o,i){if(1&o&&(t.TgZ(0,"nb-option",13),t._uU(1),t.qZA()),2&o){const e=i.$implicit,n=t.oxw(3);t.Q6J("value",e.id)("disabled",n.checkDisabled(e.id)),t.xp6(1),t.hij(" ",null==e?null:e.title," ")}}function E(o,i){if(1&o){const e=t.EpF();t.TgZ(0,"section")(1,"div",7)(2,"label",8),t._uU(3),t.qZA(),t.TgZ(4,"div",9),t.YNc(5,A,2,0,"button",1),t.TgZ(6,"nb-select",10),t.NdJ("selectedChange",function(a){const l=t.CHM(e).index;return t.oxw(2).changeData(a,l)})("selectedChange",function(a){const l=t.CHM(e).index;return t.oxw(2).for_data[l]=a}),t.TgZ(7,"nb-option",11),t._uU(8,"Ch\u1ecdn B\xe0i Vi\u1ebft"),t.qZA(),t.YNc(9,F,2,3,"nb-option",12),t.qZA()()()()}if(2&o){const e=i.index,n=t.oxw(2);t.xp6(2),t.hYB("for","data_id-",e,"-",null==n.Data?null:n.Data.id,""),t.xp6(1),t.hij(" Ch\u1ecdn B\xe0i Vi\u1ebft S\u1ed1 ",e+1,""),t.xp6(2),t.Q6J("ngIf",e+1===n.for_data.length&&n.max_fields&&n.max_fields>n.for_data.length||!n.max_fields&&e+1===n.for_data.length),t.xp6(1),t.hYB("id","data_id-",e,"-",null==n.Data?null:n.Data.id,""),t.Q6J("selected",n.for_data[e]),t.xp6(3),t.Q6J("ngForOf",n.listPostSelects)}}function Y(o,i){if(1&o&&(t.ynx(0),t.TgZ(1,"form",5),t.YNc(2,E,10,8,"section",6),t.qZA(),t.BQk()),2&o){const e=t.oxw();t.xp6(2),t.Q6J("ngForOf",e.for_data)}}let J=(()=>{class o{constructor(e,n,a){this._pageTypeService=e,this._postService=n,this._pageItemService=a,this.for_data=[],this.listPostSelects=[],this.max_fields=0,this.disableValue=[]}ngOnInit(){var e,n;(null===(e=this.Data)||void 0===e?void 0:e.id)&&(this.Data.category_id?this.getPostByCategoryId(this.Data.category_id):this.getListPostSelect("DEFAULT"),this.getPostByPageType(null===(n=this.Data)||void 0===n?void 0:n.id))}getPostByPageType(e){this._pageTypeService.getListPostByPageType(e).subscribe(n=>{var a,s,l,r;if(n){if(0!==n.max_fields){this.max_fields=n.max_fields;for(let d=0;d<n.items.length;d++)this.for_data.push((null===(a=n.items[d])||void 0===a?void 0:a.post_id)?null===(s=n.items[d])||void 0===s?void 0:s.post_id.toString():"0")}else for(let d=0;d<n.items.length;d++)this.for_data.push((null===(l=n.items[d])||void 0===l?void 0:l.post_id)?null===(r=n.items[d])||void 0===r?void 0:r.post_id.toString():"0");this.disableValue=this.for_data}})}getListPostSelect(e){this._postService.getListPosts(null!=e?e:"DEFAULT").subscribe(n=>{n&&(n.map(a=>{a.id=a.id.toString()}),this.listPostSelects=n)})}changeData(e,n){var a,s;this.disableValue[n]=e;let l=[];n=0,this.for_data.map((r,d)=>{var _,h,v,f;return d===n&&d?(n=n++,l.push({order:n,post_id:parseInt(e),page_type_id:null===(_=this.Data)||void 0===_?void 0:_.id,page_id:null===(h=this.Data)||void 0===h?void 0:h.page_id})):parseInt(r)&&r&&(n=n++,l.push({order:n,post_id:parseInt(r),page_type_id:null===(v=this.Data)||void 0===v?void 0:v.id,page_id:null===(f=this.Data)||void 0===f?void 0:f.page_id})),r}),this._pageItemService.createItemPage({data:l,page_type_id:null===(a=this.Data)||void 0===a?void 0:a.id,page_id:null===(s=this.Data)||void 0===s?void 0:s.page_id}).subscribe(r=>{var d,_;this.for_data=[],(null===(d=this.Data)||void 0===d?void 0:d.id)&&this.getPostByPageType(null===(_=this.Data)||void 0===_?void 0:_.id)})}addPostItem(){this.for_data.push("0")}getPostByCategoryId(e){this._postService.getListPostsByCategoryId(e).subscribe(n=>{n.map(a=>{a.id=a.id.toString()}),this.listPostSelects=n})}ngOnDestroy(){this.Data=void 0,this.max_fields=0,this.for_data=[],this.listPostSelects=[]}checkDisabled(e){return this.disableValue.includes(e)}}return o.\u0275fac=function(e){return new(e||o)(t.Y36(y.L),t.Y36(x.L),t.Y36(P))},o.\u0275cmp=t.Xpm({type:o,selectors:[["post-page-component"]],inputs:{Data:"Data"},decls:6,vars:3,consts:[[2,"overflow","auto"],["nbButton","","shape","round","status","info","style","margin-right: 10px",3,"click",4,"ngIf"],[4,"ngIf"],["nbButton","","shape","round","status","info",2,"margin-right","10px",3,"click"],["icon","plus-outline"],["action",""],[4,"ngFor","ngForOf"],[2,"margin-bottom","20px"],[2,"display","block","margin-bottom","10px",3,"for"],[2,"display","flex"],["placeholder","Select Post","fullWidth","",3,"id","selected","selectedChange"],["value","0"],[3,"value","disabled",4,"ngFor","ngForOf"],[3,"value","disabled"]],template:function(e,n){1&e&&(t.TgZ(0,"nb-card")(1,"nb-card-header"),t._uU(2),t.qZA(),t.TgZ(3,"nb-card-body",0),t.YNc(4,I,2,0,"button",1),t.YNc(5,Y,3,1,"ng-container",2),t.qZA()()),2&e&&(t.xp6(2),t.Oqu(null==n.Data?null:n.Data.name),t.xp6(2),t.Q6J("ngIf",!n.for_data.length||n.for_data.length<n.max_fields&&!n.for_data.length),t.xp6(1),t.Q6J("ngIf",n.for_data.length))},directives:[c.Asz,c.ndF,c.yKW,g.O5,c.DPz,c.fMN,m._Y,m.JL,m.F,g.sg,c.rs,c.q51],styles:[""]}),o})();var O=p(6943);function Q(o,i){if(1&o&&(t.TgZ(0,"nb-option",6),t._uU(1),t.qZA()),2&o){const e=i.$implicit;t.Q6J("value",null==e||null==e.id?null:e.id.toString()),t.xp6(1),t.Oqu(null==e?null:e.name)}}let B=(()=>{class o{constructor(e,n){this._categoryService=e,this._pageTypeService=n,this.model="0",this.listCategorySelects=[],this.getData()}ngOnInit(){var e,n,a;this.Data&&(null===(e=this.Data)||void 0===e?void 0:e.category_id)&&(this.model=null===(a=null===(n=this.Data)||void 0===n?void 0:n.category_id)||void 0===a?void 0:a.toString())}changeData(e){var n,a;(null===(n=this.Data)||void 0===n?void 0:n.id)&&this._pageTypeService.updatePageItemCategory(null===(a=this.Data)||void 0===a?void 0:a.id,{category_id:parseInt(this.model)}).subscribe(s=>{console.log(s)})}getData(){this._categoryService.getCategories().subscribe(e=>{this.listCategorySelects=e})}}return o.\u0275fac=function(e){return new(e||o)(t.Y36(O.H),t.Y36(y.L))},o.\u0275cmp=t.Xpm({type:o,selectors:[["category-page-component"]],inputs:{Data:"Data"},decls:12,vars:3,consts:[[2,"margin-bottom","20px"],[2,"display","block","margin-bottom","10px"],[2,"display","flex"],["placeholder","Ch\u1ecdn Danh M\u1ee5c","disabled","","fullWidth","",3,"selected","selectedChange"],["value","0"],[3,"value",4,"ngFor","ngForOf"],[3,"value"]],template:function(e,n){1&e&&(t.TgZ(0,"nb-card")(1,"nb-card-header"),t._uU(2),t.qZA(),t.TgZ(3,"nb-card-body")(4,"div",0)(5,"label",1),t._uU(6," Ch\u1ecdn Danh M\u1ee5c "),t.qZA(),t.TgZ(7,"div",2)(8,"nb-select",3),t.NdJ("selectedChange",function(s){return n.changeData(s)})("selectedChange",function(s){return n.model=s}),t.TgZ(9,"nb-option",4),t._uU(10,"Ch\u1ecdn Danh M\u1ee5c"),t.qZA(),t.YNc(11,Q,2,2,"nb-option",5),t.qZA()()()()()),2&e&&(t.xp6(2),t.Oqu(null==n.Data?null:n.Data.name),t.xp6(6),t.Q6J("selected",n.model),t.xp6(3),t.Q6J("ngForOf",n.listCategorySelects))},directives:[c.Asz,c.ndF,c.yKW,c.rs,c.q51,g.sg],styles:[""]}),o})();var M=p(8306),N=p(9646);function L(o,i){if(1&o&&(t.TgZ(0,"nb-option",9),t._uU(1),t.qZA()),2&o){const e=i.$implicit;t.s9C("value",null==e?null:e.id),t.xp6(1),t.Oqu(null==e?null:e.title)}}function U(o,i){if(1&o){const e=t.EpF();t.TgZ(0,"section")(1,"div",3)(2,"label",4),t._uU(3,"Ch\u1ecdn Qu\u1ea3ng C\xe1o"),t.qZA(),t.TgZ(4,"div",5)(5,"nb-select",6),t.NdJ("selectedChange",function(a){const l=t.CHM(e).index;return t.oxw(2).changeData(a,l)})("selectedChange",function(a){const l=t.CHM(e).index;return t.oxw(2).for_data[l]=a}),t.TgZ(6,"nb-option",7),t._uU(7,"Ch\u1ecdn Qu\u1ea3ng C\xe1o"),t.qZA(),t.YNc(8,L,2,2,"nb-option",8),t.ALo(9,"async"),t.qZA()()()()}if(2&o){const e=i.index,n=t.oxw(2);t.xp6(2),t.MGl("for","data_id-",e,""),t.xp6(3),t.MGl("id","data_id-",e,""),t.Q6J("selected",n.for_data[e]),t.xp6(3),t.Q6J("ngForOf",t.lcZ(9,4,n.listPostSelects))}}function q(o,i){if(1&o&&(t.ynx(0),t.TgZ(1,"form",1),t.YNc(2,U,10,6,"section",2),t.qZA(),t.BQk()),2&o){const e=t.oxw();t.xp6(2),t.Q6J("ngForOf",e.for_data)}}let w=(()=>{class o{constructor(e,n,a){this._pageTypeService=e,this._postService=n,this._pageItemService=a,this.posts=[],this.for_data=[],this.listPostSelects=new M.y,this.getListPostSelect()}ngOnInit(){var e,n;(null===(e=this.Data)||void 0===e?void 0:e.id)&&this.getPostByPageType(null===(n=this.Data)||void 0===n?void 0:n.id)}getPostByPageType(e){this._pageTypeService.getListPostByPageType(e).subscribe(n=>{var a,s;if(n){if(this.posts=n.items,n.items.length){for(let l=0;l<n.items.length;l++)this.for_data.push((null===(a=n.items[l])||void 0===a?void 0:a.post_id)?null===(s=n.items[l])||void 0===s?void 0:s.post_id.toString():"0");return}this.for_data.push("0")}})}getListPostSelect(){this._postService.getListPosts("ADS").subscribe(e=>{e&&(this.listPostSelects=(0,N.of)(e))})}changeData(e,n){var a,s;let l=[];this.for_data.map((r,d)=>{var _,h,v,f;return d===n?l.push({order:d+1,post_id:parseInt(e),page_type_id:null===(_=this.Data)||void 0===_?void 0:_.id,page_id:null===(h=this.Data)||void 0===h?void 0:h.page_id}):parseInt(r)&&l.push({order:d+1,post_id:parseInt(r),page_type_id:null===(v=this.Data)||void 0===v?void 0:v.id,page_id:null===(f=this.Data)||void 0===f?void 0:f.page_id}),r}),this._pageItemService.createItemPage({data:l,page_type_id:null===(a=this.Data)||void 0===a?void 0:a.id,page_id:null===(s=this.Data)||void 0===s?void 0:s.page_id}).subscribe(r=>{console.log(r)})}addPostItem(){this.for_data.push("0")}}return o.\u0275fac=function(e){return new(e||o)(t.Y36(y.L),t.Y36(x.L),t.Y36(P))},o.\u0275cmp=t.Xpm({type:o,selectors:[["advertisement-page-component"]],inputs:{Data:"Data"},decls:5,vars:2,consts:[[4,"ngIf"],["action",""],[4,"ngFor","ngForOf"],[2,"margin-bottom","20px"],[2,"display","block","margin-bottom","10px",3,"for"],[2,"display","flex"],["placeholder","Select Post","fullWidth","",3,"id","selected","selectedChange"],["value","0"],[3,"value",4,"ngFor","ngForOf"],[3,"value"]],template:function(e,n){1&e&&(t.TgZ(0,"nb-card")(1,"nb-card-header"),t._uU(2),t.qZA(),t.TgZ(3,"nb-card-body"),t.YNc(4,q,3,1,"ng-container",0),t.qZA()()),2&e&&(t.xp6(2),t.Oqu(null==n.Data?null:n.Data.name),t.xp6(2),t.Q6J("ngIf",n.for_data.length))},directives:[c.Asz,c.ndF,c.yKW,g.O5,m._Y,m.JL,m.F,g.sg,c.rs,c.q51],pipes:[g.Ov],styles:[""]}),o})();function z(o,i){if(1&o&&t._UZ(0,"post-page-component",3),2&o){const e=t.oxw().$implicit;t.Q6J("Data",e)}}function H(o,i){if(1&o&&t._UZ(0,"category-page-component",3),2&o){const e=t.oxw().$implicit;t.Q6J("Data",e)}}function R(o,i){if(1&o&&t._UZ(0,"advertisement-page-component",3),2&o){const e=t.oxw().$implicit;t.Q6J("Data",e)}}function $(o,i){if(1&o&&(t.ynx(0),t.YNc(1,z,1,1,"post-page-component",2),t.YNc(2,H,1,1,"category-page-component",2),t.YNc(3,R,1,1,"advertisement-page-component",2),t.BQk()),2&o){const e=i.$implicit;t.xp6(1),t.Q6J("ngIf","POST"===e.type),t.xp6(1),t.Q6J("ngIf","CATEGORY"===e.type),t.xp6(1),t.Q6J("ngIf","ADS"===e.type)}}function V(o,i){if(1&o&&(t.ynx(0),t.YNc(1,$,4,3,"ng-container",1),t.BQk()),2&o){const e=t.oxw();t.xp6(1),t.Q6J("ngForOf",e.page_data.pageTypes)}}let u=(()=>{class o{constructor(e,n,a,s){this._router=e,this._titleService=n,this._activeRouter=a,this._pageServiceService=s,this.page_id=0}ngOnInit(){this._activeRouter.data.subscribe(e=>{this.page_id=e.page_id,this.loadComponentPage(e.page_id)})}loadComponentPage(e){this._pageServiceService.getComponentsPage(e).subscribe(n=>{n&&(this.page_data=n)})}}return o.\u0275fac=function(e){return new(e||o)(t.Y36(C.F0),t.Y36(D.Dx),t.Y36(C.gz),t.Y36(T.d))},o.\u0275cmp=t.Xpm({type:o,selectors:[["app-pages"]],decls:1,vars:1,consts:[[4,"ngIf"],[4,"ngFor","ngForOf"],[3,"Data",4,"ngIf"],[3,"Data"]],template:function(e,n){1&e&&t.YNc(0,V,2,1,"ng-container",0),2&e&&t.Q6J("ngIf",n.page_data&&n.page_data.pageTypes)},directives:[g.O5,g.sg,J,B,w],styles:[""]}),o})();const j=[{path:"home",component:u,data:{page_id:1,title:"Home"}},{path:"e-sport",component:u,data:{page_id:2,title:"E SPORT"}},{path:"game-card",component:u,data:{page_id:3,title:"GAME CARD"}},{path:"deals",component:u,data:{page_id:4,title:"deals"}},{path:"video",component:u,data:{page_id:5,title:"VIDEO"}},{path:"agency",component:u,data:{page_id:6,title:"\u0110\u1ea1i L\xfd"}},{path:"sport",component:u,data:{page_id:8,title:"Th\u1ec3 Thao"}},{path:"livestream",component:u,data:{page_id:9,title:"livestream"}}];let W=(()=>{class o{}return o.\u0275fac=function(e){return new(e||o)},o.\u0275mod=t.oAB({type:o}),o.\u0275inj=t.cJS({imports:[[C.Bz.forChild(j)],C.Bz]}),o})(),k=(()=>{class o{}return o.\u0275fac=function(e){return new(e||o)},o.\u0275mod=t.oAB({type:o}),o.\u0275inj=t.cJS({providers:[],imports:[[g.ez,W,c.zyh,c.IIj,m.u5,c.KdK,c.T2N,c.j7H.forRoot()]]}),o})()}}]);