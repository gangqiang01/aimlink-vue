webpackJsonp([7],{GIYm:function(e,t){},crvc:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a("y6A+"),o=a("yHTr"),r={name:"devicegroupList",data:function(){return{groupTableData:[],deviceGroupList:[],multipleTable:[],limit:10,dataCount:null,currentPage:1,addLoading:!1,dialogFormVisible:!1,isshow:!1,aid:"",form:{accountname:"",groupName:"",groupDescription:""},groupKeyword:"",rules:{groupName:[{required:!0,message:"Please input group name",trigger:"blur"},{min:2,max:12,message:"Group name size is 2~12",trigger:"blur"}]}}},methods:{getDeviceGroup:function(){var e=this;_g.openGlobalLoading(),Object(i.c)(this).then(function(t){Object(o.a)(t,function(t){console.log("grouplist",t),e.groupTableData=t.accounts[0].groups,e.form.account=t.accounts[0].fullName,e.aid=t.accounts[0].aid,e.dataCount=e.groupTableData.length,e.deviceGroupList=e.groupTableData.slice(0,e.limit),e.isshow=e.dataCount>e.limit})})},confirmDelete:function(e){var t=this;swal({title:"Are you sure?",text:"delete this group(this group must be empty)",icon:"warning",buttons:!0,dangerMode:!0}).then(function(a){a&&Object(i.b)(e).then(function(e){Object(o.a)(e,function(e){e.result&&swal("","Delete group successfully","success").then(function(){t.getDeviceGroup()})})})})},handleSelectionChange:function(e){this.multipleTable=e},handleCurrentChange:function(e){this.currentPage=e,this.deviceGroupList=this.groupTableData.slice((e-1)*this.limit,e*this.limit)},addGroup:function(){var e=this;this.dialogFormVisible=!1,Object(i.a)(this.aid,"",this.form.groupName,this.form.groupDescription).then(function(t){Object(o.a)(t,function(t){t.result&&swal("","Add group successfully","success").then(function(t){t&&e.getDeviceGroup()})})})}},created:function(){this.getDeviceGroup()}},n={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[e._m(0),e._v(" "),a("div",{staticClass:"m-t-20"},[a("div",{staticClass:"panel-header"},[e._v("\n            All Device Group\n            ")]),e._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.deviceGroupList}},[a("el-table-column",{attrs:{type:"expand"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-form",{staticClass:"demo-table-expand",attrs:{"label-position":"left",inline:""}},[a("el-form-item",{attrs:{label:"Group Name:"}},[a("span",[e._v(e._s(t.row.name))])]),e._v(" "),a("el-form-item",{attrs:{label:"Devices Count:"}},[a("span",[e._v(e._s(t.row.numOfDevices))])]),e._v(" "),a("el-form-item",{attrs:{label:"Group Description:"}},[a("span",[e._v(e._s(t.row.description))])])],1)]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"Group Name",prop:"name","min-width":"120",sortable:""}}),e._v(" "),a("el-table-column",{attrs:{label:"Group ID",prop:"gid","min-width":"120",sortable:""}}),e._v(" "),a("el-table-column",{attrs:{label:"Create Time","min-width":"120"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("div",[e._v("\n                        "+e._s(e._f("time")(t.row.create_unix_ts))+"\n                    ")])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"Action","min-width":"120"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("div",[a("span",[a("el-button",{attrs:{size:"small",type:"danger"},on:{click:function(a){e.confirmDelete(t.row)}}},[e._v("Delete")])],1)])]}}])})],1),e._v(" "),a("div",{staticClass:"m-t-10 cf"},[a("el-pagination",{directives:[{name:"show",rawName:"v-show",value:e.isshow,expression:"isshow"}],staticClass:"fr",attrs:{layout:"prev, pager, next","page-size":e.limit,"current-page":e.currentPage,total:e.dataCount,background:""},on:{"current-change":e.handleCurrentChange}})],1),e._v(" "),a("div",{staticClass:"m-t-10 cf"},[a("el-button",{directives:[{name:"loading",rawName:"v-loading",value:e.addLoading,expression:"addLoading"}],staticClass:"m-t-10 fr",attrs:{size:"small",type:"primary"},on:{click:function(t){e.dialogFormVisible=!0}}},[e._v("Add")]),e._v(" "),a("el-dialog",{attrs:{title:"Select device group you want to add",visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[a("el-form",{attrs:{model:e.form,"label-width":"150px"}},[a("el-form-item",{attrs:{label:"Account Name:"}},[a("el-input",{attrs:{disabled:"disabled"},model:{value:e.form.account,callback:function(t){e.$set(e.form,"account","string"==typeof t?t.trim():t)},expression:"form.account"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"Group Name:"}},[a("el-input",{model:{value:e.form.groupName,callback:function(t){e.$set(e.form,"groupName","string"==typeof t?t.trim():t)},expression:"form.groupName"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"Description"}},[a("el-input",{attrs:{type:"textarea"},model:{value:e.form.groupDescription,callback:function(t){e.$set(e.form,"groupDescription","string"==typeof t?t.trim():t)},expression:"form.groupDescription"}})],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{directives:[{name:"loading",rawName:"v-loading",value:e.addLoading,expression:"addLoading"}],attrs:{size:"small",type:"primary"},on:{click:function(t){e.addGroup()}}},[e._v("Add")])],1)],1)],1)],1)])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"m-t-10 "},[t("p",{staticClass:"header-line"},[t("i",{staticClass:"fa fa-object-group c-primary m-r-10",attrs:{"aria-hidden":"true"}}),this._v(" Device Group ")])])}]};var s=a("C7Lr")(r,n,!1,function(e){a("GIYm")},"data-v-6f9291dc",null);t.default=s.exports}});
//# sourceMappingURL=7.9db6fa42cffebd07f876.js.map