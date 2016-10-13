'use strict';
module.exports.register = function(Handlebars){
  Handlebars.registerHelper('eachDate', function(context, next, future, previous, options) {
    var buffer = "";
    // Register Current date, current epoch, and month
    var nowOb=new Date();
    var dtNow=nowOb.getTime()
    var monthNow=nowOb.getMonth()

    for(var i=0; i<context.length; i++) {
      var m=context[i]
      // Register meeting date, epoch, and month
      var dateOb=new Date(m.date+' 11:30')
      var dt=dateOb.getTime()
      var monthDate=dateOb.getMonth()

      if(dtNow < dt && monthNow==monthDate){
        m.occuring=next;
      } else if( dtNow < dt){
        m.occuring=future;
      } else if (dtNow > dt){
        m.occuring=previous;
      }
      buffer+=options.fn(m)
    }
    return buffer;
  });
}
