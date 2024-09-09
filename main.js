// First check if favorite button exists on the page
const oFavButton = document.querySelector("._20GZU button.bvpjc")
if (oFavButton) {
	const oPicture = document.querySelector("._2SlAD"),
	      oStarsContainer = document.createElement("div")
	
  oStarsContainer.setAttribute("id", "stars")
  oStarsContainer.classList.add("nB1UF", "pvY2P")
  oStarsContainer.style.display = "flex"

  oStarsContainer.addEventListener("mouseleave", function() {
		highlightStars(0)
	})

  // @TODO This should be read via API.. at the moment these are just my own collections
  const aCollections = [
  	11989706, // Featured
  	94365556, // CremeDeLaCreme
  	39361123, // Devious Collection
  	98770249, // Prime"
  ]
  
  for (let i in aCollections) {
  	i = parseInt(i)

    // Cloning the favorite button so we can use its hover logic
  	const oNewStar = oFavButton.cloneNode(true),
  	      oFavText = oNewStar.querySelector("._2DN7K"),
  	      oPrevStars = oStarsContainer.querySelectorAll("button.bvpjc")

    oNewStar.removeChild(oFavText)
    
    // Hover highlighting
    oNewStar.addEventListener("mouseenter", function() {
    	highlightStars(i + 1)
    })
    
    // Clicks
    oNewStar.addEventListener("click", async function() {
    	const oResponse = await fetch("https://www.deviantart.com/_puppy/dashared/collections/collect", {
    		method: "POST",
    		headers: {
		      "Accept": "application/json",
		      "Content-Type": "application/json"
		    },
    		body: JSON.stringify({
    			"itemid": parseInt(window.location.href.split("-").pop()),
    			"folderids": aCollections.slice(0, i + 1),
    			"da_minor_version": 20230710,
    			"csrf_token": __CSRF_TOKEN__
    		})
    	})
    })
  
  	oStarsContainer.appendChild(oNewStar)
  }

  // Wait a bit so react doesn't trigger an error
	setTimeout(function() {
		oPicture.before(oStarsContainer)
	}, 10)
	
}

// Highlights given number of stars from left to right
function highlightStars(iStars) {
	const oAllStars = document.getElementById("stars").querySelectorAll("button.bvpjc")
	oAllStars.forEach(function(oStar, iStar) {
		oStar.style.color = iStar >= iStars ? "white" : "var(--off-hover)"
	})
}
