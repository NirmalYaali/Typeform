var parsed_typeform_fields="";
var total_Typeforms= {};
let initial={
    removing_lookup:function()
    {
        if(Object.keys(desk_fields).length)
        {
            for (const each_field of desk_fields) {
                if(each_field.isMandatory)
                {
                    if(each_field.type=="LookUp")
                    {
                        if(each_field.apiName=="contactId")
                        {
                            let DeskObj={
                                url:'https://desk.zoho.com/api/v1/layouts?module=contacts',
                                headers : { 'Content-Type' : 'application/json' },
                                type : 'GET',
                                data : {},
                                postBody : {},
                                connectionLinkName: 'desk'
                            };
                            ZOHODESK.request(DeskObj).then(function(data){
                            let parsed_data=JSON.parse(data);
                            if(parsed_data.statusCode==200)
                                {
                                        let parsing_data_again=JSON.parse(parsed_data.response);
                                        if(Object.keys(parsing_data_again.statusMessage).length)
											{
                                    if(parsing_data_again.status=="true"){
                                        let temp_id=parsing_data_again.statusMessage.data[0].id;
                                        let ticket_layout={
                                            url:'https://desk.zoho.com/api/v1/layouts/'+temp_id,
                                            headers:{ 'Content-Type' : 'application/json' },
                                            type:'GET',
                                            data:{},
                                            postBody:{},
                                            connectionLinkName: 'desk'
                                                    }
                                        ZOHODESK.request(ticket_layout).then(function(data){
                                        let parsed_data=JSON.parse(data);
                                        if(parsed_data.statusCode==200)
                                            {
                                            parsed_desk_data=JSON.parse(parsed_data.response);
                                            if(Object.keys(parsed_desk_data.statusMessage).length)
                                            {
                                            if(parsed_desk_data.status=="true")
                                                {
                                                    let contact_array=parsed_desk_data.statusMessage.sections[0].fields;
                                                    for (const each_contact of contact_array) {
                                                        if(each_contact.isMandatory)
                                                        {
                                                            if(!desk_fields.hasOwnProperty(each_field.apiName+"*"+each_contact.apiName))
                                                            {
                                                                each_contact.apiName=each_field.apiName+"*"+each_contact.apiName;
                                                                desk_fields.push(each_contact);
                                                            }
                                                        }
                                                    }
                                                    let current_index=desk_fields.indexOf(each_field);
                                                    desk_fields.splice(current_index,1);
                                                }
                                                else
                                                {
                                                    document.getElementById("error").style.display = "inline-block";
                                                    document.getElementById("errormsg").innerHTML = "Something Went Wrong Please Try Again";
                                                    setTimeout(function () {
                                                      document.getElementById("error").style.display = "none";
                                                  document.getElementById("errormsg").innerHTML = '';
                                                    }, 3000);   
                                                }
                                            }
                                            else if(parsed_desk_data.statusMessage.includes("Invoke URL API Execution Limit reached"))
			                                    {
                                                    document.getElementById("apiLimitpage").style.display="block";
                                                    document.getElementById("view").style.display="none";
                                                    document.getElementById("loading").style.display="none";	
			                                    }   
                                            }
                                            else
                                            {
                                                document.getElementById("error").style.display = "inline-block";
                                                document.getElementById("errormsg").innerHTML = "Something Went Wrong Please Try Again";
                                                setTimeout(function () {
                                                  document.getElementById("error").style.display = "none";
                                              document.getElementById("errormsg").innerHTML = '';
                                                }, 3000);
                                            }
                                        })
                                        
                                    }
                                    else
                                    {
                                        document.getElementById("error").style.display = "inline-block";
                                    document.getElementById("errormsg").innerHTML = "Something Went Wrong Please Try Again";
                                    setTimeout(function () {
                                      document.getElementById("error").style.display = "none";
                                  document.getElementById("errormsg").innerHTML = '';
                                    }, 3000);
                                    }
                                }
                                    else if(parsing_data_again.statusMessage.includes("Invoke URL API Execution Limit reached"))
                                    {
                                        document.getElementById("apiLimitpage").style.display="block";
										document.getElementById("view").style.display="none";
										document.getElementById("loading").style.display="none";
                                    }
                                }
                                else
                                {
                                    document.getElementById("error").style.display = "inline-block";
                                    document.getElementById("errormsg").innerHTML = "Something Went Wrong Please Try Again";
                                    setTimeout(function () {
                                      document.getElementById("error").style.display = "none";
                                  document.getElementById("errormsg").innerHTML = '';
                                    }, 3000);   
                                }
                            })           
                        }
                        else if(each_field.apiName=="accountId")
                        {
                            let DeskObj={
                                url:'https://desk.zoho.com/api/v1/layouts?module=accounts',
                                headers : { 'Content-Type' : 'application/json' },
                                type : 'GET',
                                data : {},
                                postBody : {},
                                connectionLinkName: 'desk'
                            };
                            ZOHODESK.request(DeskObj).then(function(data){
                            let parsed_data=JSON.parse(data);
                            if(parsed_data.statusCode==200)
                                {
                                        let parsing_data_again=JSON.parse(parsed_data.response);
                                    if(Object.keys(parsing_data_again.statusMessage).length)
							        {
                                    if(parsing_data_again.status=="true"){
                                        let temp_id=parsing_data_again.statusMessage.data[0].id;
                                        let ticket_layout={
                                            url:'https://desk.zoho.com/api/v1/layouts/'+temp_id,
                                            headers:{ 'Content-Type' : 'application/json' },
                                            type:'GET',
                                            data:{},
                                            postBody:{},
                                            connectionLinkName: 'desk'
                                                    }
                                        ZOHODESK.request(ticket_layout).then(function(data){
                                        let parsed_data=JSON.parse(data);
                                        if(parsed_data.statusCode==200)
                                            {
                                            parsed_desk_data=JSON.parse(parsed_data.response);
                                            if(Object.keys(parsed_desk_data.statusMessage).length)
                                            {
                                            if(parsed_desk_data.status=="true")
                                                {
                                                    let account_array=parsed_desk_data.statusMessage.sections[0].fields;
                                                    for (const each_account of account_array) {
                                                        if(each_account.isMandatory)
                                                        {
                                                            if(!desk_fields.hasOwnProperty(each_field.apiName+"*"+each_account.apiName))
                                                            {
                                                                each_account.apiName=each_field.apiName+"*"+each_account.apiName;
                                                                desk_fields.push(each_account);
                                                            }
                                                        }
                                                    }
                                                    let current_index=desk_fields.indexOf(each_field);
                                                    desk_fields.splice(current_index,1);
                                                }
                                                else
                                                {
                                                    document.getElementById("error").style.display = "inline-block";
                                    document.getElementById("errormsg").innerHTML = "Something Went Wrong Please Try Again";
                                    setTimeout(function () {
                                      document.getElementById("error").style.display = "none";
                                  document.getElementById("errormsg").innerHTML = '';
                                    }, 3000);
                                                }
                                            }
                                            else if(parsed_desk_data.statusMessage.includes("Invoke URL API Execution Limit reached"))
                                            {
                                                document.getElementById("apiLimitpage").style.display="block";
						                        document.getElementById("view").style.display="none";
						                        document.getElementById("loading").style.display="none";
                                            }
                                            }
                                            else
                                            {
                                                document.getElementById("error").style.display = "inline-block";
                                                document.getElementById("errormsg").innerHTML = "Something Went Wrong Please Try Again";
                                                setTimeout(function () {
                                                  document.getElementById("error").style.display = "none";
                                              document.getElementById("errormsg").innerHTML = '';
                                                }, 3000);
                                            }
                                        })
                                    }
                                    else
                                    {
                                        document.getElementById("error").style.display = "inline-block";
                                        document.getElementById("errormsg").innerHTML = "Something Went Wrong Please Try Again";
                                        setTimeout(function () {
                                          document.getElementById("error").style.display = "none";
                                      document.getElementById("errormsg").innerHTML = '';
                                        }, 3000);
                                    }
                                }
                                else if(parsing_data_again.statusMessage.includes("Invoke URL API Execution Limit reached"))
                                {
                                    document.getElementById("apiLimitpage").style.display="block";
						            document.getElementById("view").style.display="none";
						            document.getElementById("loading").style.display="none";
                                }
                                }
                                else
                                {
                                    document.getElementById("error").style.display = "inline-block";
          								document.getElementById("errormsg").innerHTML = "Something Went Wrong Please Try Again";
          								setTimeout(function () {
          									  document.getElementById("error").style.display = "none";
            								document.getElementById("errormsg").innerHTML = '';
         									 }, 3000);
                                }
                            })
                        }
                        else if(each_field.apiName==="productId")
                        {
                            let DeskObj={
                                url:'https://desk.zoho.com/api/v1/layouts?module=products',
                                headers : { 'Content-Type' : 'application/json' },
                                type : 'GET',
                                data : {},
                                postBody : {},
                                connectionLinkName: 'desk'
                            };
                            ZOHODESK.request(DeskObj).then(function(data){
                            let parsed_data=JSON.parse(data);
                            if(parsed_data.statusCode==200)
                                {
                                        let parsing_data_again=JSON.parse(parsed_data.response);
                                        if(Object.keys(parsing_data_again.statusMessage).length)
                                        {
                                            
                                    if(parsing_data_again.status=="true"){
                                        let temp_id=parsing_data_again.statusMessage.data[0].id;
                                        let ticket_layout={
                                            url:'https://desk.zoho.com/api/v1/layouts/'+temp_id,
                                            headers:{ 'Content-Type' : 'application/json' },
                                            type:'GET',
                                            data:{},
                                            postBody:{},
                                            connectionLinkName: 'desk'
                                                    }
                                        ZOHODESK.request(ticket_layout).then(function(data){
                                        let parsed_data=JSON.parse(data);
                                        if(parsed_data.statusCode==200)
                                            {
                                            parsed_desk_data=JSON.parse(parsed_data.response);
                                            if(Object.keys(parsed_data.response).length)
                                            {
                                            if(parsed_desk_data.status=="true")
                                                {
                                                    let product_array=parsed_desk_data.statusMessage.sections[0].fields;
                                                    for (const each_product of product_array) {
                                                        if(each_product.isMandatory)
                                                        {
                                                            if(!desk_fields.hasOwnProperty(each_field.apiName+"*"+each_product.apiName) && each_product.apiName!="departmentIds")
                                                            {
                                                                each_product.apiName=each_field.apiName+"*"+each_product.apiName;
                                                                desk_fields.push(each_product);
                                                                
                                                            }
                                                        }
                                                    }
                                                    let current_index=desk_fields.indexOf(each_field);
                                                    desk_fields.splice(current_index,1);
                                                }
                                                else{
                                                    document.getElementById("error").style.display = "inline-block";
                                    document.getElementById("errormsg").innerHTML = "Something Went Wrong Please Try Again";
                                    setTimeout(function () {
                                      document.getElementById("error").style.display = "none";
                                  document.getElementById("errormsg").innerHTML = '';
                                    }, 3000);
                                                }
                                            }
                                            else if(parsing_data_again.statusMessage.includes("Invoke URL API Execution Limit reached"))
                                            {
                                                document.getElementById("apiLimitpage").style.display="block";
                                    document.getElementById("view").style.display="none";
                                    document.getElementById("loading").style.display="none";	
                                            }   
                                            }
                                            else
                                            {
                                                document.getElementById("error").style.display = "inline-block";
                                                document.getElementById("errormsg").innerHTML = "Something Went Wrong Please Try Again";
                                                setTimeout(function () {
                                                  document.getElementById("error").style.display = "none";
                                              document.getElementById("errormsg").innerHTML = '';
                                                }, 3000);
                                            }
                                        })
                                        
                                    }
                                    else
                                    {
                                        document.getElementById("error").style.display = "inline-block";
                                        document.getElementById("errormsg").innerHTML = "Something Went Wrong Please Try Again";
                                        setTimeout(function () {
                                          document.getElementById("error").style.display = "none";
                                      document.getElementById("errormsg").innerHTML = '';
                                        }, 3000);
                                    }
                                }
                                else if(parsing_data_again.statusMessage.includes("Invoke URL API Execution Limit reached"))
                                {
                                    document.getElementById("apiLimitpage").style.display="block";
						document.getElementById("view").style.display="none";
						document.getElementById("loading").style.display="none";	
                                }
                                }
                                else
                                {
                                    document.getElementById("error").style.display = "inline-block";
                                    document.getElementById("errormsg").innerHTML = "Something Went Wrong Please Try Again";
                                    setTimeout(function () {
                                      document.getElementById("error").style.display = "none";
                                  document.getElementById("errormsg").innerHTML = '';
                                    }, 3000);
                                }
                            })
                        }
                        else if(each_field.apiName=="departmentId")
                        {
                            each_field.apiName=each_field.apiName+"-name";
                        }
                        else if(each_field.apiName=="assigneeId")
                        {   
                            each_field.type="Email"
                            each_field.displayLabel=each_field.displayLabel+" EmailId";
                            each_field.apiName=each_field.apiName+"-emailId";
                        }
                    }
                }
            }
            console.log("before",desk_fields);
            desk_fields=desk_fields.sort(function(a,b){
                if(a.displayLabel < b.displayLabel)
                {
                    return -1;
                }
                else if(a.displayLabel > b.displayLabel)
                {
                   return 1;
                }
               })
               console.log("after",desk_fields);
        }
        window.TypeformEdit.showing_data();
    },
    check_box:function(obj)
    {
        if(obj.checked)
        {
            document.getElementById("optional").style.display="block";
        }
        else
        {
            document.getElementById("optional").style.display="none";
        }
        
    },
    Showing_field_selection:function()
    {      
            mandatory=true;
            for (const iterator of document.getElementById("initial")) 
            {
                temp_collection=document.getElementById(iterator.id); 
                    if(iterator.required==true && iterator.value=="")
                    {
                        mandatory=false;
                        iterator.classList.add("error_border");
                        document.getElementById("inital_validation").innerHTML='*Please Fill Reqired Fields*';
                        document.getElementById("inital_validation").classList.add("error_font");
                    }
                       
            }
            if(mandatory)
            {
                let value=document.getElementById("Typeform_select").value;  
            $('#initial').css("display","none");
            document.getElementById("loading").style.display="block";   
            document.getElementById("Mandatory").innerHTML="";
            document.getElementById("optional").innerHTML="";
            document.getElementById("button_section").innerHTML="";
            let reqObj={
                    url:'https://api.typeform.com/forms/'+value,
                    headers:{ 'Content-Type' : 'application/json' },
                    type:'GET',
                    data:{},
                    postBody:{},
                    connectionLinkName:'typeform'
            };  
            ZOHODESK.request(reqObj).then(function(data){
                console.log(data);
                let parsed_data=JSON.parse(data);
            if(parsed_data.statusCode==200){
                let parsing_data_again=JSON.parse(parsed_data.response);
                if(Object.keys(parsing_data_again).length)
                {
                if(parsing_data_again.status=="true"){
                parsed_typeform_fields=parsing_data_again.statusMessage.fields;
            if(desk_fields.length)
             {
            for (const iterator of desk_fields) {
                if(iterator.isMandatory)
                {
                    let creation=document.createElement("div");
                    let label=document.createElement("label");
                    label.classList.add("mdb-main-label");
                    label.classList.add("pluginlabel");
                    if(iterator.displayLabel=="Contact Name")
                    {
                        label.innerHTML="Last Name";
                    }
                    else
                    {
                        label.innerHTML=iterator.displayLabel;
                    }
                    let label_span=document.createElement("span");
                    label_span.style.color="tomato";
                    label_span.innerText=" *";
                    label.appendChild(label_span);
                    let select=document.createElement("select");
                    // select.className="mdb-select md-form Selection_dropdown";
                    select.className="form-control select2";
                    select.style.width="430px";
                    select.name=iterator.displayLabel;
                    select.id=iterator.apiName;
                    select.required=true;
                    let option=document.createElement("option");
                    option.text="-Select-";
                    option.value="";
                    option.selected="selected";
                    select.add(option,select[0]);
                    console.log("parsed_typeform_fields",parsed_typeform_fields);
                    for (const fields_iterator of parsed_typeform_fields) {
                        if(fields_iterator.type!="statement")
                        {
                        if(fields_iterator.validations.required)
                        {
                            if((iterator.type=="Text" || iterator.type=="LookUp") && fields_iterator.type=="short_text")
                            {   
                                let option=document.createElement("option");
                                option.text=fields_iterator.title;
                                option.value=fields_iterator.id;
                                select.add(option,select[0]);

                            }
                            else if(iterator.type=="Textarea" && fields_iterator.type=="long_text")
                            {
                                // "opinion_scale" 
                                let option=document.createElement("option");
                                option.text=fields_iterator.title;
                                option.value=fields_iterator.id;
                                select.add(option,select[0]);
                            }
                            else if(iterator.type=="Multiselect" && fields_iterator.type=="multiple_choice")
                            {
                                let option=document.createElement("option");
                                option.text=fields_iterator.title;
                                option.value=fields_iterator.id;
                                select.add(option,select[0]);
                            }
                            else if(iterator.type=="Phone" && fields_iterator.type=="phone_number")
                            {
                                let option=document.createElement("option");
                                option.text=fields_iterator.title;
                                option.value=fields_iterator.id;
                                select.add(option,select[0]);
                            }
                            else if(iterator.type=="Boolean" && (fields_iterator.type=="yes_no" || fields_iterator.type=="legal"))
                            {
                                let option=document.createElement("option");
                                option.text=fields_iterator.title;
                                option.value=fields_iterator.id;
                                select.add(option,select[0]);
                            }
                            else if(iterator.type=="Email" && fields_iterator.type=="email")
                            {
                                let option=document.createElement("option");
                                option.text=fields_iterator.title;
                                option.value=fields_iterator.id;
                                select.add(option,select[0]);
                            }
                            else if((iterator.type=="Number" || iterator.type=="Currency"|| iterator.type=="Decimal" || iterator.type=="Percent") && (fields_iterator.type=="number" || fields_iterator.type=="opinion_scale" || fields_iterator.type=="rating"))
                            {
                                let option=document.createElement("option");
                                option.text=fields_iterator.title;
                                option.value=fields_iterator.id;
                                select.add(option,select[0]);
                            }   
                            else if((iterator.type=="Date" || iterator.type=="DateTime") && fields_iterator.type=="date")
                            {
                                let option=document.createElement("option");
                                option.text=fields_iterator.title;
                                option.value=fields_iterator.id;
                                select.add(option,select[0]);
                            }
                            else if(iterator.type=="Picklist" && fields_iterator.type=="dropdown")
                            {
                                let option=document.createElement("option");
                                option.text=fields_iterator.title;
                                option.value=fields_iterator.id;
                                select.add(option,select[0]);
                            }
                            else if(iterator.type=="URL" && fields_iterator.type=="website")
                            {
                                let option=document.createElement("option");
                                option.text=fields_iterator.title;
                                option.value=fields_iterator.id;
                                select.add(option,select[0]);
                            }
                        }
                    }
                    }
                    creation.appendChild(label);
                    // creation.appendChild(label_span);
                     split_span=document.createElement("span");
                     split_span.innerHTML=":";
                     split_span.classList.add("spliter");
                    creation.appendChild(split_span);
                    creation.appendChild(select);
                    let error_div=document.createElement("div");
                    error_div.id=iterator.displayLabel+"_"+iterator.apiName;
                    document.getElementById("Mandatory").appendChild(creation);
                    document.getElementById("Mandatory").append(error_div);
                }
                else
                {   
                    let Optional_creation=document.createElement("div");
                    let label=document.createElement("label");
                    label.classList.add("mdb-main-label")
                    label.classList.add("pluginlabel");
                    label.innerHTML=iterator.displayLabel;
                    let select=document.createElement("select");
                    // select.className="mdb-select md-form Selection_dropdown";
                    select.className="form-control select2";
                    select.style.width="430px";
                    select.name=iterator.displayLabel;
                    select.id=iterator.apiName;
                    let option=document.createElement("option");
                    option.text="-Select-";
                    option.value="";
                    option.selected="selected";
                    select.add(option,select[0]);
                    Optional_creation.appendChild(label);
                    split_span=document.createElement("span");
                    split_span.innerHTML=":";
                    split_span.classList.add("spliter");
                    Optional_creation.appendChild(split_span);    
                    for (const fields_iterator of parsed_typeform_fields) {
                        if(fields_iterator.type!="statement")
                        {
                            if(iterator.type=="Text" && fields_iterator.type=="short_text")
                            {   
                                let option=document.createElement("option");
                                option.text=fields_iterator.title;
                                option.value=fields_iterator.id;
                                select.add(option,select[0]);
                            }
                            else if(iterator.type=="Textarea" && fields_iterator.type=="long_text")
                            {
                                // "opinion_scale" 
                                let option=document.createElement("option");
                                option.text=fields_iterator.title;
                                option.value=fields_iterator.id;
                                select.add(option,select[0]);
                            }
                            else if(iterator.type=="Multiselect" && fields_iterator.type=="multiple_choice")
                            {
                                let option=document.createElement("option");
                                option.text=fields_iterator.title;
                                option.value=fields_iterator.id;
                                select.add(option,select[0]);
                            }
                            else if(iterator.type=="Phone" && fields_iterator.type=="phone_number")
                            {
                                let option=document.createElement("option");
                                option.text=fields_iterator.title;
                                option.value=fields_iterator.id;
                                select.add(option,select[0]);
                            }
                            else if(iterator.type=="Boolean" && (fields_iterator.type=="yes_no" || fields_iterator.type=="legal"))
                            {
                                let option=document.createElement("option");
                                option.text=fields_iterator.title;
                                option.value=fields_iterator.id;
                                select.add(option,select[0]);
                            }
                            else if(iterator.type=="Email" && fields_iterator.type=="email")
                            {
                                let option=document.createElement("option");
                                option.text=fields_iterator.title;
                                option.value=fields_iterator.id;
                                select.add(option,select[0]);
                            }
                            else if((iterator.type=="Number" || iterator.type=="Currency"|| iterator.type=="Decimal" || iterator.type=="Percent") && (fields_iterator.type=="number" || fields_iterator.type=="opinion_scale" || fields_iterator.type=="rating"))
                            {
                                let option=document.createElement("option");
                                option.text=fields_iterator.title;
                                option.value=fields_iterator.id;
                                select.add(option,select[0]);
                            }   
                            else if((iterator.type=="Date" || iterator.type=="DateTime") && fields_iterator.type=="date")
                            {
                                let option=document.createElement("option");
                                option.text=fields_iterator.title;
                                option.value=fields_iterator.id;
                                select.add(option,select[0]);
                            }
                            else if(iterator.type=="Picklist" && fields_iterator.type=="dropdown")
                            {
                                let option=document.createElement("option");
                                option.text=fields_iterator.title;
                                option.value=fields_iterator.id;
                                select.add(option,select[0]);
                            }
                            else if(iterator.type=="URL" && fields_iterator.type=="website")
                            {
                                let option=document.createElement("option");
                                option.text=fields_iterator.title;
                                option.value=fields_iterator.id;
                                select.add(option,select[0]);
                            }
                    }
                    }
                    Optional_creation.appendChild(select);
                    document.getElementById("optional").appendChild(Optional_creation);
                    
                }
            } 
            document.getElementById("button_section").innerHTML="";
            document.getElementById("button_section").style.display="block";
            document.getElementById("button_section").innerHTML='<button type="button" style="margin-left:35%;"class="PluginButton" onclick=saving_typeform("'+value+'")>Save</button>'+	
			'<button type="button" style="margin-left:3%;" class="PluginButton" onclick=window.Homepage.Create_back_button()>Back</button>';  
            document.getElementById("loading").style.display="none";
            document.getElementById('selection').style.display="block";
         }
         $('.select2').select2(
             {
             width:'resolve'
             }
         );
    }
    else
    {
        document.getElementById("error").style.display = "inline-block";
                                    document.getElementById("errormsg").innerHTML = "Something Went Wrong Please Try Again";
                                    setTimeout(function () {
                                      document.getElementById("error").style.display = "none";
                                  document.getElementById("errormsg").innerHTML = '';
                                    }, 3000);
    }
    }
    else if(parsing_data_again.statusMessage.includes("Invoke URL API Execution Limit reached"))
                                            {
                                                document.getElementById("apiLimitpage").style.display="block";
                                    document.getElementById("selection").style.display="none";
                                    document.getElementById("loading").style.display="none";	
                                            }
    }
    else
    {
        document.getElementById("error").style.display = "inline-block";
        document.getElementById("errormsg").innerHTML = "Something Went Wrong Please Try Again";
        setTimeout(function () {
          document.getElementById("error").style.display = "none";
      document.getElementById("errormsg").innerHTML = '';
        }, 3000);
    }
            })
        }
        
    },
    Create_back_button:function()
    {
            document.getElementById('initial').style.display="block";
            document.getElementById("selection").style.display="none";
    },
    view_back:function()
    {
        document.getElementById('view').style.display="none";
        document.getElementById('initial').style.display="block";
    },
}
window.Homepage=initial;
function saving_typeform(id)
    {
        mandatory=true;
        for (const iterator of document.getElementById("selection")) {
            if(iterator.type!="button")
            {
                if(iterator.required==true && iterator.value =="")
                {
                    mandatory=false;
                    document.getElementById(iterator.name+"_"+iterator.id).innerHTML="Please fill Mandatory Field";       
                    document.getElementById(iterator.id).classList.add("error_border");   
                    document.getElementById(iterator.name+"_"+iterator.id).classList.add("view_error_font"); 
                }
                else if(iterator.required==true && iterator.value !="")
                {
                    document.getElementById(iterator.name+"_"+iterator.id).innerHTML="";
                    document.getElementById(iterator.name+"_"+iterator.id).classList.remove("view_error_font");
                    document.getElementById(iterator.id).classList.remove("error_border");
                }
            }
        }
        if(mandatory==true)
        {
            document.getElementById("selection").style.display="none";
            document.getElementById("loading").style.display="block";
            let values={};
            for (const each_field of document.getElementById("selection"))
            {
                if(each_field.type!="button")
                {
                if(each_field.value && each_field.id)
                {       
                    if(each_field.id=="CreateDecision")
                    {   
                        values[each_field.id+"&"+each_field.id]=each_field.checked+"&"+each_field.checked;
                        if(each_field.checked=="false")
                        {
                            break;
                        }
                       
                    }
                    else
                    {
                     values[each_field.id+"&" +each_field.name]=each_field.value+"&"+each_field.options[each_field.selectedIndex].text;
                    }
                }
                }    
            }
            let Webhook_id=document.getElementById("Typeform_select").value+"_"+Date.now();
            let link_data={
                "enabled": true,
                "verify_ssl":false,
                "url": "https://desk.zoho.com/api/v1/publishedScripts/141278000000740040/execute?publishedTime=1589556076911&orgId=711770823&securityContext={{securityContext}}"   
              };
            let TypeformObj={
                url : 'https://api.typeform.com/forms/'+id+'/webhooks/'+Webhook_id,
                headers : { 'Content-Type' : 'application/json' },
                type : 'PUT',
                data : {},
                postBody : link_data,	
                connectionLinkName: 'typeform'
                };
                ZOHODESK.request(TypeformObj).then(function(data){
                    console.log(data);
                    let parsed_data=JSON.parse(data);
                    if(parsed_data.statusCode=="200")
                    {
                        let parsing_status=JSON.parse(parsed_data.response);
                        if(Object.keys(parsing_status).length)
                        {
                        if(parsing_status.status=="true")
                        {
                            ZOHODESK.set('database',{'key':document.getElementById("Typeform_select").value,'value': values,'queriableValue':'Master'}).then(function(response)
                            { 
                                console.log(response);
                            })
                            ZOHODESK.get('database',{'key':"Total_Webhooks",'queriableValue':'Webhooks'}).then(function(response)
                                {   
                                    let all_webhooks=response['database.get'];
                                    if(Object.keys(all_webhooks).length)
                                    {
                                        this.total_webhooks=all_webhooks.data[0].value;
                                    }
                                    this.total_webhooks[document.getElementById("Typeform_select").value]=Webhook_id;
                                    console.log(total_webhooks);
                                    ZOHODESK.set('database',{'key':"Total_Webhooks",'value':total_webhooks,'queriableValue':'Webhooks'}).then(function(response)
                                    { 
                                        let getting_text=document.getElementById("Typeform_select");
                                        let typeform_data={};
                                        typeform_data["Typeform_name"]=getting_text.options[getting_text.selectedIndex].innerHTML;
                                        this.total_Typeforms[document.getElementById("Typeform_select").value]=typeform_data;
                                        var typeform_select=document.getElementById("Typeform_select");
                                        typeform_select.innerHTML="";
                                                var typeform_option=document.createElement("option");
                                            typeform_option.text ="Select a Typeform to Connect";
                                            typeform_option.value="";
                                            typeform_option.selected="selected";
                                            typeform_select.add(typeform_option,typeform_select[1]);
                                        for (const each_form of parsed_data_again.statusMessage.items) {
                                            if(!total_Typeforms.hasOwnProperty(each_form.id))
                                            {
                                            var typeform_option=document.createElement("option");
                                            typeform_option.text =each_form.title;
                                            typeform_option.value=each_form.id;
                                            typeform_select.add(typeform_option,typeform_select[1]);
                                            }
                                            }
            ZOHODESK.set('database',{'key':"Typeforms",'value':total_Typeforms,'queriableValue':''}).then(function(response)
            {
                console.log("success",response);
            })
            document.getElementById("selection").style.display="none";
            document.getElementById("loading").style.display="block";
            document.getElementById("success").style.display = "inline-block";
              document.getElementById("sucMsg").innerHTML = "Field Mapping created successfully";
              setTimeout(function () {
                document.getElementById("success").style.display = "none";
                document.getElementById("sucMsg").innerHTML = '';
              }, 3000);
              window.TypeformEdit.showing_data();
                                    })
                                 })
                                  
                            }
                            else
                            {
                                document.getElementById("error").style.display = "inline-block";
                                document.getElementById("errormsg").innerHTML = "Something Went Wrong Please Try Again";
                                setTimeout(function () {
                                document.getElementById("error").style.display = "none";
                              document.getElementById("errormsg").innerHTML = '';
                               }, 3000);
                               window.TypeformEdit.showing_data();
                            }
                        }
                        else if(parsing_status.statusMessage.includes("Invoke URL API Execution Limit reached"))
                                            {
                                                document.getElementById("apiLimitpage").style.display="block";
                                    document.getElementById("selection").style.display="none";
                                    document.getElementById("loading").style.display="none";	
                                            }
                        }
                        else
                        {
                            document.getElementById("error").style.display = "inline-block";
                            document.getElementById("errormsg").innerHTML = "Something Went Wrong Please Try Again";
                            setTimeout(function () {
                            document.getElementById("error").style.display = "none";
                          document.getElementById("errormsg").innerHTML = '';
                           }, 3000);
                           window.TypeformEdit.showing_data();
                        }
                        
                })
        // document.getElementById('view').style.display="block";
        
    }
    }
    function add_typeform()
    {
        document.getElementById("view").style.display="none";
        document.getElementById("initial").style.display="block";
    }
    function view_page()
    {
        var typeform_select=document.getElementById("Typeform_select");
        typeform_select.innerHTML="";
                var typeform_option=document.createElement("option");
               typeform_option.text ="Select a Typeform to Connect";
               typeform_option.value="";
               typeform_option.selected="selected";
               typeform_select.add(typeform_option,typeform_select[1]);
        for (const each_form of parsed_data_again.statusMessage.items) {
            if(!total_Typeforms.hasOwnProperty(each_form.id))
            {
               var typeform_option=document.createElement("option");
               typeform_option.text =each_form.title;
               typeform_option.value=each_form.id;
               typeform_select.add(typeform_option,typeform_select[1]);
            }
       }
        document.getElementById("view").style.display="block";
        document.getElementById("initial").style.display="none";
    }

   