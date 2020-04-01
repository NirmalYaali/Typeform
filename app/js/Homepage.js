// {"connectionLinkName":"new_typeform","connectionName":"New Typeform","serviceName":"new_typeform1","userAccess":false,"isUserDefinedService":true,"sharedBy":710306485,"scope":["forms:read"]},{"connectionLinkName":"desk","connectionName":"desk","serviceName":"zlabs_integration","userAccess":true,"isUserDefinedService":false,"sharedBy":711770823,"scope":["Desk.contacts.ALL","Desk.extensions.ALL","Desk.settings.ALL","Desk.tickets.ALL"]}
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
                                            if(parsed_desk_data.status=="true")
                                                {
                                                    let contact_array=parsed_desk_data.statusMessage.sections[0].fields;
                                                    for (const each_contact of contact_array) {
                                                        if(each_contact.isMandatory)
                                                        {
                                                            if(!desk_fields.hasOwnProperty(each_field.apiName+"-"+each_contact.apiName))
                                                            {
                                                                each_contact.apiName=each_field.apiName+"-"+each_contact.apiName;
                                                                desk_fields.push(each_contact);
                                                            }
                                                        }
                                                    }
                                                    let current_index=desk_fields.indexOf(each_field);
                                                    desk_fields.splice(current_index,1);
                                                }
                                            }
                                        })
                                        
                                    }
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
                                            if(parsed_desk_data.status=="true")
                                                {
                                                    let account_array=parsed_desk_data.statusMessage.sections[0].fields;
                                                    for (const each_account of account_array) {
                                                        if(each_account.isMandatory)
                                                        {
                                                            if(!desk_fields.hasOwnProperty(each_field.apiName+"-"+each_account.apiName))
                                                            {
                                                                each_account.apiName=each_field.apiName+"-"+each_account.apiName;
                                                                desk_fields.push(each_account);
                                                            }
                                                        }
                                                    }
                                                    let current_index=desk_fields.indexOf(each_field);
                                                    desk_fields.splice(current_index,1);
                                                }
                                            }
                                        })
                                    }
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
                                            if(parsed_desk_data.status=="true")
                                                {
                                                    let product_array=parsed_desk_data.statusMessage.sections[0].fields;
                                                    for (const each_product of product_array) {
                                                        if(each_product.isMandatory)
                                                        {
                                                            if(!desk_fields.hasOwnProperty(each_field.apiName+"-"+each_product.apiName) && each_product.apiName!="departmentIds")
                                                            {
                                                                each_product.apiName=each_field.apiName+"-"+each_product.apiName;
                                                                desk_fields.push(each_product);
                                                                
                                                            }
                                                        }
                                                    }
                                                    let current_index=desk_fields.indexOf(each_field);
                                                    desk_fields.splice(current_index,1);
                                                }
                                            }
                                        })
                                        
                                    }
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
    Showing_field_selection:function(value)
    {      
            mandatory=true;
            for (const iterator of document.getElementById("initial")) 
            {
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
            $('#initial').css("display","none");   
            document.getElementById("Mandatory").innerHTML="";
            document.getElementById("optional").innerHTML="";
            document.getElementById("button_section").innerHTML="";
            document.getElementById('selection').style.display="block";
            let reqObj={
                    url:'https://api.typeform.com/forms/'+document.getElementById("Typeform_select").value,
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
                    select.className="mdb-select md-form Selection_dropdown";
                    select.name=iterator.displayLabel;
                    select.id=iterator.apiName;
                    select.required=true;
                    let option=document.createElement("option");
                    option.text="";
                    option.value="";
                    option.selected="selected";
                    select.add(option,select[0]);
                    for (const fields_iterator of parsed_typeform_fields) {
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
                            else if(iterator.type=="Boolean" && fields_iterator.type=="yes_no")
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
                            else if((iterator.type=="Number" || iterator.type=="Decimal") && fields_iterator.type=="number")
                            {
                                let option=document.createElement("option");
                                option.text=fields_iterator.title;
                                option.value=fields_iterator.id;
                                select.add(option,select[0]);
                            }   
                            else if(iterator.type=="Date" && fields_iterator.type=="date")
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
                    select.className="mdb-select md-form Selection_dropdown";
                    select.name=iterator.displayLabel;
                    select.id=iterator.apiName;
                    let option=document.createElement("option");
                    option.text="";
                    option.value="";
                    option.selected="selected";
                    select.add(option,select[0]);
                    Optional_creation.appendChild(label);
                    split_span=document.createElement("span");
                    split_span.innerHTML=":";
                    split_span.classList.add("spliter");
                    Optional_creation.appendChild(split_span);    
                    for (const fields_iterator of parsed_typeform_fields) {
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
                            else if(iterator.type=="Boolean" && fields_iterator.type=="yes_no")
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
                            else if((iterator.type=="Number" || iterator.type=="Decimal" || iterator.type=="Percent") && fields_iterator.type=="number")
                            {
                                let option=document.createElement("option");
                                option.text=fields_iterator.title;
                                option.value=fields_iterator.id;
                                select.add(option,select[0]);
                            }   
                            else if(iterator.type=="Date" && fields_iterator.type=="date")
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
                    Optional_creation.appendChild(select);
                    document.getElementById("optional").appendChild(Optional_creation);
                    
                }
            } 
            document.getElementById("button_section").innerHTML="";
            document.getElementById("button_section").style.display="block";
            document.getElementById("button_section").innerHTML='<button type="button" style="margin-left:40%;"class="PluginButton" onclick=saving_typeform("selection")>Save</button>'+	
			'<button type="button" style="margin-left:3%;" class="PluginButton" onclick=window.Homepage.Create_back_button()>Back</button>';  
        }
    }
    }
            })
        }
        
    },
    Create_back_button:function()
    {
            document.getElementById('initial').style.display="block";
            document.getElementById("selection").style.display="none";
    },
    adding_values_to_dropdown:function(id)
    {
        if(id)
        {
            let existing= [];
                for (const itr of document.getElementById("selection")) {
                     if(itr.value && itr.type!='button')
                     {   
                       existing.push(itr.value);
                     }

                }
                    let dropdown=document.getElementById(id);
                    if(dropdown.value=="")
                    {
                         dropdown.innerText=null;
						for (const each_form of parsed_typeform_fields) {
                                if(!existing.includes(each_form.id))
                                {
                                    var dropdown_option=document.createElement("option");
                                    dropdown_option.text =each_form.title;
                                    dropdown_option.value=each_form.id;
                                    dropdown.add(dropdown_option,dropdown[1]);
                                 }
                        }
                    }

        }
    },
    
    view_back:function()
    {
        document.getElementById('view').style.display="none";
        document.getElementById('initial').style.display="block";
    },
    Existing_typeform:function()
    {
        ZOHODESK.extension.onload().then(function(data){
			let reqObj={
				url:'https://desk.zoho.com/api/v1/layouts',
				headers : { 'Content-Type' : 'application/json' },
				type : 'GET',
				data : {},
				postBody : {},
				connectionLinkName: 'desk'
			};
				ZOHODESK.request(reqObj).then(function(err){
                	console.log(err);
			})
            }) 
    },
    Addoption:function(id)
    {   
        let reqObj={
            url:'https://api.typeform.com/forms/'+document.getElementById("Typeform_select").value,
            headers:{ 'Content-Type' : 'application/json' },
            type:'GET',
            data:{},
            postBody:{},
            connectionLinkName:'typeform'
        };
            if(!fields.length)
            {
                ZOHODESK.request(reqObj).then(function(data){
                fields=JSON.parse(JSON.parse(data).response).statusMessage.fields;
                let getting_section=document.getElementById("optional");
                let creation=document.createElement("div");
                let span_creation=document.createElement("span");
                let select=document.createElement("select");
                select.className="mdb-select md-form";
                    for (const iterator of fields) {
                        let option =document.createElement("option");
                        option.text=iterator.title;
                        option.value=iterator.id;
                        select.add(option,select[1]);
                    }
                span_creation.appendChild(select);
                creation.appendChild(span_creation);

                let span_creation_again=document.createElement("span");
                let select_again=document.createElement("select");
                select_again.className="mdb-select md-form";
                 for (const iterator of typeform_fields) {
                     let option=document.createElement("option");
                     option.text=iterator.apiName;
                     option.value=iterator.id;
                     select_again.add(option,select_again[1]);
                 }
                span_creation_again.appendChild(select_again);
                creation.appendChild(span_creation_again);
                let icon=document.createElement("span");
                icon.className="fa fa-trash";
                icon.setAttribute('onclick','window.Homepage.delete_icon(event)');
                icon.setAttribute("aria-hidden",true);
                creation.appendChild(icon);
                getting_section.appendChild(creation);
        })
        }
        else
        {   
                let getting_section=document.getElementById("optional");
                let creation=document.createElement("div");
                let span_creation=document.createElement("span");
                let select=document.createElement("select");
                    select.classList.add("mdb-select") 
                    select.classList.add("md-form");
                    for (const iterator of fields) {
                        let option =document.createElement("option");
                        option.text=iterator.title;
                        option.value=iterator.id;
                        select.add(option,select[1]);
                    }
                span_creation.appendChild(select);
                creation.appendChild(span_creation);
                let span_creation_again=document.createElement("span");
                let select_again=document.createElement("select");
                select_again.classList.add("mdb-select") 
                select_again.classList("md-form");
                for(const iterator of typeform_fields){
                    let option=document.createElement("option");
                    option.text=iterator.apiName;
                    option.value=iterator.id;
                    select_again.add(option,select_again[0]);
                }
                span_creation_again.appendChild(select_again);
                creation.appendChild(span_creation_again);

                let icon=document.createElement("span");
                icon.className="fa fa-trash";
                icon.setAttribute('onclick','window.Homepage.delete_icon(event)');
                icon.setAttribute("aria-hidden",true);
                creation.appendChild(icon);
                getting_section.appendChild(creation);
        }
    },
    delete_icon:function(eventing)
    {
            (eventing.path[1]).remove();
    },
    creating_webhook:function()
    {
        let link_data={
            "enabled": true,
            "url": "https://www.bizappln.com/testwebhook/yaalitestwebhook.php"  
          };
        let TypeformObj={
            url : 'https://api.typeform.com/forms/'+document.getElementById("Typeform_select").value+'/webhooks/'+document.getElementById("Typeform_select").value,
            headers : { 'Content-Type' : 'application/json' },
            type : 'GET',
            data : {},
            postBody : link_data,	
            connectionLinkName: 'typeform'
			};
            ZOHODESK.request(TypeformObj).then(function(data){
                console.log(data);
            })
    }
}
window.Homepage=initial;

function saving_typeform(id)
    {
        mandatory=true;
        for (const iterator of document.getElementById(id)) {
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
            let values={};
            for (const each_field of document.getElementById(id))
            {
                if(each_field.type!="button")
                {
                if(each_field.value && each_field.id)
                {       
                    if(each_field.id=="CreateDecision")
                    {   
                        values[each_field.id+"_"+each_field.id]=each_field.checked+"_"+each_field.checked;
                        if(each_field.checked=="false")
                        {
                            break;
                        }
                       
                    }
                    else
                    {
                     values[each_field.id+"_" +each_field.name]=each_field.value+"_"+each_field.options[each_field.selectedIndex].text;
                    }
                }
                }    
            }
            // console.log("values",values);
        ZOHODESK.set('database',{'key':document.getElementById("Typeform_select").value,'value': values,'queriableValue':''}).then(function(response)
        { 
            window.Homepage.creating_webhook();
        })
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
        document.getElementById('initial').style.display="block";
        document.getElementById("selection").style.display="none";
        ZOHODESK.set('database',{'key':"Typeforms",'value':total_Typeforms,'queriableValue':''}).then(function(response)
        {
            console.log("success",response);
        })
    }
    }