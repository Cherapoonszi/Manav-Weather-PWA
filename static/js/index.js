document.addEventListener('DOMContentLoaded', function() {

    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    }

    function success(pos) {
        var crd = pos.coords;
        
        console.log('Your current position is:');
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters.`);

        let opts = {
            lat: crd.latitude,
            long: crd.longitude
        }

        opts = JSON.stringify(opts)

        fetch("/weather", {
            method: "POST",
            body: opts,
            headers: {
                "Content-Type": "application/json"
            }
        }).then(async response => {
            let resp = await response.text()
            resp = JSON.parse(resp)
            resp1 = resp.html_content
            resp2 = resp.html_content2
            append = document.querySelector("#append")
            append2 = document.querySelector("#append2")
            const hide = document.getElementsByClassName("hide-before")
            for (x of hide) {
                x.style.display = "none"
            }
            append.innerHTML = resp1
            append2.innerHTML = resp2
        })  
    }
    
    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
        alert(`ERROR(${err.code}): ${err.message}`)
    }
    
    navigator.geolocation.getCurrentPosition(success, error, options);

})