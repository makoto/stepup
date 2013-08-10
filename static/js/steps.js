var Steps = Backbone.Collection.extend({
  initialize: function(){
    this.on("sync", function(data){
      this._currentId = data.first().get("id")
    })
  },
  current: function(){
    return this.findWhere({id:this._currentId})
  },
  next: function(){
    this._currentId++
    return this.findWhere({id:this._currentId})    
  },
  prev: function(){
    this._currentId--
    return this.findWhere({id:this._currentId})    
  },
  model: Step,
  url: function () {
    return "/data/steps.json"
  }
});
