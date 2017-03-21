function Query(query)
			{
            var selector = document.getElementById("selector");
            var selected = selector.options[selector.selectedIndex].text;
			$(".resRow").remove()

				var query = {
					"statements": [{
						"statement": "match (f1: Fish {name:'" + selected + "'})-[*]->(c)<-[*]-(f2:Fish) return distinct (f2.name)as youMightLike, count(c) as similarityLevel, collect(distinct c.name) as similarities order by similarityLevel desc limit 5"
					}]
				};

				var neoRequest = $.ajax({
					type: "POST",
					url: "http://52.34.27.230:7474/db/data/transaction/commit",
					accepts: { json: "application/json" },
					dataType: "json",
					contentType: "application/json",
					data: JSON.stringify(query),
					beforeSend: function (xhr) {
						xhr.setRequestHeader("Authorization", "Basic " + btoa("neo4j:08Kia#37"));
					},
					success: function (data)
					{
						console.log("**** Query Success ****");
						console.log(data);
						var results = data.results[0].data;
						var output = "Name | Rank | Similar <br>";
						console.log(results);
						// Empty previous table contents
						$("#fishtable tbody").empty()
                    for (var i = 0; i < results.length; i++)
                    {
                        var name = results[i].row[0];
                        var similarityLevel = results[i].row[1];
                        var sim  = results[i].row[2];
                        https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_string
                        var similarities = String(sim).replace(/_/g, " "); // Replace underscores
                        var name = String(name).replace(/_/g, " ");
                        var similarities = String(similarities).replace(/,/g, ", ");
                        //output += name + " | " + similarityLevel + " | " + similarities  + "<br>";
                        var newRowContent = "<tr><td>"+name+"</td><td>"+similarityLevel+"</td><td>"+similarities+"</td></tr>";
						$("#fishtable tbody").append(newRowContent);

                    }

					},
					error:function(xhr,err,msg){
                    console.log(xhr);
                    console.log(err);
                    console.log(msg);
                }
				});				
			}

function getFish(query)
			{

				var query = {
					"statements": [{
						"statement": query
					}]
				};

				var neoRequest = $.ajax({
					type: "POST",
					url: "http://52.34.27.230:7474/db/data/transaction/commit",
					accepts: { json: "application/json" },
					dataType: "json",
					contentType: "application/json",
					data: JSON.stringify(query),
					beforeSend: function (xhr) {
						xhr.setRequestHeader("Authorization", "Basic " + btoa("neo4j:08Kia#37"));
					},
					success: function (data)
					{
						console.log("**** getFish Success ****");
						console.log(data);
						var results = data.results[0].data;
						var selector = document.getElementById("selector");
						console.log(results);

						for (var i = 0; i < results.length; i++)
						{
							console.log(i);
							var name = results[i].row[0];
							var option = document.createElement("option");
	                        option.text = name;
	                        selector.appendChild(option);
						}
						console.log("GetFish - Query()");
                    	Query();

					},
					error:function(xhr,err,msg){
                    console.log(xhr);
                    console.log(err);
                    console.log(msg);
                }
				});				
			}