var map = L.map('map').setView([10.021660, 105.728317], 8);

    L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	maxZoom: 20,
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

    var OpenStreetMap = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
    var OpenTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	maxZoom: 20,
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

    var OpenWeatherMap = L.tileLayer('http://{s}.tile.openweathermap.org/map/clouds/{z}/{x}/{y}.png?appid={apiKey}', {
        maxZoom: 19,
        attribution: 'Map data &copy; <a href="http://openweathermap.org">OpenWeatherMap</a>',
        apiKey: '<insert your api key here>',
        opacity: 0.5
    });

    var googleHybrid = L.tileLayer('http://{s}.google.com/vt?lyrs=s,h&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});

    var baseMap ={
        'OSM': OpenStreetMap,
        'OTM': OpenTopoMap,
        'OWM': OpenWeatherMap,
        'GG Hybrid': googleHybrid,
    };

    var marker = L.marker([10.021660, 105.728317])
    // .bindPopup();

    var buLayer= L.geoJSON(bu_data, {
        style: {
            color: 'red',
            fillcolor: 'blue'
        },

        onEachFeature: function(feature, layer){
            layer.bindPopup('Tỉnh: '+ feature.properties.ten_tinh)
        },

        // filter: function(feature){
        //     if(feature.properties.TYPE == "MA_1") {
        //         return true;
        //     }
        // },
    });

    var overLayers ={
        'Marker': marker,
        'BU data': buLayer,
        
    };

    L.control.layers(baseMap, null, {collapsed: true}).addTo(map);


    // Leyer on/off check box
    // $(".layer-card-cb").on("change", function() {
    //     if($(this).is(":checked")){
            
    //         buLayer.addTo(map);
    //     }
    //     else{
    //         map.removeLayer(buLayer);
            
    //     }
    // });

    // opacity control

    // $(".opacity").on("change", function(){
    //     var val = $(this).val();
    //     var opacity = val / 100;
    //     console.log(opacity);

    //     buLayer.setStyle({fillOpacity: opacity, opacity: opacity});
    // })

    function handleLayer(layerName) {
        var layer = L.tileLayer.wms('http://localhost:8080/geoserver/wms', {
            layers: layerName,
            format: 'image/png',
            transparent: true,
        });

        return layer;
    };

    
    // handleLayer('demo:HienTrangMatDoDanSo_CapHuyen').addTo(map);

    // handleLayer('geoapp:HienTrangBenhVien').addTo(map).bringToFront();


    // Layer card in leaflet sidebar
    layersFromGeoserver.map((layer) => {
        $(".left-sidebar").append(
          layerCardGenerator(
            layer.layerTitle,
            layer.layerName,
            layer.defaultCheck,
            layer.thumbnailUrl,
            layer.description
          )
        );
      });

    // default layer on switch
    layersFromGeoserver.map((layer)=> {
        if (layer.defaultCheck == 'checked'){
            handleLayer(layer.layerName).addTo(map);

            $('.legend').append(wmsLegendControl(layer.layerName, layer.layerTitle));

        }
    });


    //   layer on/off switcher
    $('.layer-card-cb').on('change', function(){
        var layerName = $(this).attr('id')
        var layerTitle = $(this).attr('name')

        if ($(this).is(':checked')){
            window[layerName]= handleLayer(layerName).addTo(map).bringToFront();

            $('.legend').append(wmsLegendControl(layerName, layerTitle));
        }else{
            map.eachLayer(function(layer){
                if (layer.options.layers === layerName) {
                    map.removeLayer(layer);
                    
                }
                
            })

            var className = layerName.split(":")[1];
            $(`.legend .${className}`).remove();
        }
    });

    // layer opacity controller
    $('.opacity').on('change', function() {
        var layerName = $(this).attr('code');
        var opacity = $(this).val() / 100;

        map.eachLayer(function(layer) {
            if (layer.options.layers == layerName){
                layer.setOpacity(opacity)
            }
        });
    });

    // layer legend control
    function wmsLegendControl(layerName, layerTitle) {

        var className= layerName.split(":")[1];
        var url= `http://localhost:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=${layerName}`;
        var legend= `<p class=${className} style= "margin-top: 10px; font-weight: bold">${layerTitle}</p>`;

        legend += `<p><img class=${className} src=${url} /></p>`
        return legend;
    };

    // $('.legend').append(wmsLegendControl());

