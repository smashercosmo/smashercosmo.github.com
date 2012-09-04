(function(){ window.JST || (window.JST = {}) 
window.JST["shopSection"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var stack1, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n";
  stack1 = depth0.Sales;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(2, program2, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n";
  return buffer;}
function program2(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\r\n<section class=\"sales-section\">\r\n    <h2 class=\"sales-section-header\">";
  foundHelper = helpers.Name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.Name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</h2>\r\n    ";
  stack1 = depth0.Sales;
  stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(3, program3, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n</section>\r\n";
  return buffer;}
function program3(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\r\n    <div class=\"sale\">\r\n        <div class=\"sale-content\">\r\n            <a href=\"#\" class=\"sale-title\">";
  foundHelper = helpers.Name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.Name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</a>\r\n            <img class=\"sale-image\" src=\"";
  foundHelper = helpers.saleImage;
  stack1 = foundHelper ? foundHelper.call(depth0, depth0, {hash:{}}) : helperMissing.call(depth0, "saleImage", depth0, {hash:{}});
  buffer += escapeExpression(stack1) + "\" alt=\"Sale image\">\r\n        </div>\r\n    </div>\r\n    ";
  return buffer;}

  stack1 = depth0.List;
  stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }});
Handlebars.partials["shopSection"] = window.JST["shopSection"];

})();