/**
 * @add jQuery.Controller Prototype
 */

jQuery.Controller.prototype.
/**
 * @tag view
 * Renders a View template with the controller instance. If the first argument
 * is not supplied, 
 * it looks for a view in /views/controller_name/action_name.ejs.
 * If data is not provided, it uses the controller instance as data.
 * @codestart
 * TasksController = $.Controller.extend('TasksController',{
 *   click : function(el){
 *     // renders with views/tasks/click.ejs
 *     el.html( this.view() ) 
 *     // renders with views/tasks/under.ejs
 *     el.after( this.view("under", [1,2]) );
 *     // renders with views/shared/top.ejs
 *     el.before( this.view("shared/top", {phrase: "hi"}) );
 *   }
 * })
 * @codeend
 * @plugin controller/view
 * @return {String} the rendered result of the view.
 * @param {optional:String} view The view you are going to render.  If a view isn't explicity given
 * this function will try to guess at the correct view as show in the example code above.
 * @param {optional:Object} data data to be provided to the view.  If not present, the controller instance 
 * is used.
 * @param {optional:Object} myhelpers an object of helpers that will be available in the view.  If not present
 * this controller class's "Helpers" property will be used.
 *
 */
view = function(view, data, myhelpers) {
		//shift args if no view is provided
        if(typeof view != "string" && !myhelpers){
            myhelpers = data;
            data = view;
            view = null;
        }
        var controller_name = this.Class.underscoreName, action_name = this.called;
        //calculate view
        
        if(typeof view == "string") {
			if(view.substr(0,2) == "//" ) //leave where it is
                view = view.substr(2)
            else{
                view = new include.File( '../views/'+ 
                    (jQuery.String.include(view,'/') ? view : controller_name+'/'+view)
                    ).joinFrom(this.Class._path)+jQuery.View.ext
            }
        }else if(!view) {
            view = new include.File(
                '../views/'+controller_name+'/'+action_name.replace(/\.|#/g, '').replace(/ /g,'_')
                ).joinFrom(this.Class._path)+jQuery.View.ext;
        }
        
        //calculate data
        data = data || this;
        
        //calculate helpers
        var helpers = {};
        if(myhelpers){
            if(jQuery.isArray(myhelpers))
                for(var h =0; h < myhelpers.length; h++) jQuery.extend(helpers, myhelpers[h] );
            else
                jQuery.extend(helpers, myhelpers );
        }else{
            if(this._default_helpers ) helpers = this._default_helpers
            //load from name
            var current = window;
            var parts = this.Class.fullName.split(/\./);
            for(var i =0; i < parts.length; i++){
                if(typeof current.Helpers == 'object'){
                    jQuery.extend(helpers, current.Helpers );
                }
                current = current[parts[i]];
            }
            if(typeof current.Helpers == 'object'){
                    jQuery.extend(helpers, current.Helpers );
            }
            this._default_helpers = helpers;
        }
        
		
        return new jQuery.View(view).render(data, helpers); //what about controllers in other folders?
};