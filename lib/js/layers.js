var rest_layer = http://localhost:8080/geoserver/rest/layers

var layersFromGeoserver = [
    {
        layerName: "demo:HienTrangMatDoDanSo_CapHuyen",
        layerTitle: "Population Density",
        
        defaultCheck: "checked",
        thumbnailUrl: "./img/pp_density.PNG",
        description: "Population density in Mekong Delta Region",
    },

    {
        layerName: "demo:HienTrangMangLuoiDuongBo",
        layerTitle: "Transportation",
        
        defaultCheck: "false",
        thumbnailUrl: "./img/transportation.PNG",
        description: "The current transportation infrastructure in Mekong Delta Region",
    },

    {
        layerName: "geoapp:HienTrangBenhVien",
        layerTitle: "Hospital",
        
        defaultCheck: "false",
        thumbnailUrl: "./img/hospital.PNG",
        description: "The current hospital infrastructure network in Mekong Delta Region",
    },

];