//Define Masking Layer to remove Ocean Pixels
var elev = ee.Image('srtm90_v4');
var elevation_mask = elev.mask();
var countries = ee.FeatureCollection("FAO/GAUL/2015/level0");
var country = countries.filter(ee.Filter.eq('ADM0_CODE',254));
print(country)
Map.addLayer(country,['green'],'ukraine');



//Map Center
Map.centerObject(ROIKiev, 9)


//Define Timestamps

var VIIRS_2021_a  = '2021-03-01'
var VIIRS_2021_b = '2021-03-31'
var VIIRS_2022_a  = '2022-03-01'
var VIIRS_2022_b = '2022-03-31'


//Import VIIRs
var VIIRS = ee.ImageCollection('NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG')
                  .filterDate('2012-04-01', '2022-08-31')
                  .select('avg_rad');

//VIIRS July21                  
var VIIRS_2021 = VIIRS.filterDate(VIIRS_2021_a, VIIRS_2021_b).max()
                  .updateMask(elevation_mask);    
//VIIRS June21                  
var VIIRS_2022 = VIIRS.filterDate(VIIRS_2022_a, VIIRS_2022_b).max()
                  .updateMask(elevation_mask);    
                  
//UA Only
var VIIRS_2021_UAOnly = VIIRS.filterDate(VIIRS_2021_a, VIIRS_2021_b).max()
                  .clip(country);   

var VIIRS_2022_UAOnly = VIIRS.filterDate(VIIRS_2022_a, VIIRS_2022_b).max()
                  .clip(country);
                  
//Change World, world percent, UA Only
var VIIRS_change21_22 =VIIRS_2022.subtract(VIIRS_2021);
var VIIRS_change21_22_Percent =(VIIRS_2022.subtract(VIIRS_2021).divide(VIIRS_2021)).multiply(100);
var VIIRS_change21_22_UAOnly = VIIRS_2022_UAOnly.subtract(VIIRS_2021_UAOnly);

//Add to Map
Map.addLayer(VIIRS_2021, {min:0, max:30, palette:['black', 'khaki', 'orange','orangered', 'red', 'maroon']}, 'VIIRS 2021');
Map.addLayer(VIIRS_2022, {min:0, max:30, palette:['black', 'khaki', 'orange','orangered', 'red', 'maroon']}, 'VIIRS 2022');
Map.addLayer(VIIRS_change21_22, {min:-20, max:20 , palette: ['blue', 'white', 'red']}, 'VIIRS change 2021-2022');
Map.addLayer(VIIRS_change21_22_Percent, {min:-100, max:100 , palette: ['blue', 'white', 'red']}, 'VIIRS change 2021-2022 in Percent');


//AddtoMap UA
Map.addLayer(VIIRS_2021_UAOnly, {min:0, max:30, palette:['black', 'khaki', 'orange','orangered', 'red', 'maroon']}, 'VIIRS 2021 UA');
Map.addLayer(VIIRS_2022_UAOnly, {min:0, max:30, palette:['black', 'khaki', 'orange','orangered', 'red', 'maroon']}, 'VIIRS 2022 UA');
Map.addLayer(VIIRS_change21_22_UAOnly, {min:-20, max:20 , palette: ['blue', 'white', 'red']}, 'VIIRS change 2021-2022 UA');


//Sum Nighttime Radiance UA CIties
var reducersUA_Kiev = VIIRS_2021.reduceRegion( ee.Reducer.sum(), ROIKiev, 1000) 
print ('Kiev radiance 21', reducersUA_Kiev)
var reducersUA_Kiev22 = VIIRS_2022.reduceRegion( ee.Reducer.sum(), ROIKiev, 1000) 
print ('Kiev radiance 22', reducersUA_Kiev22)
var reducersUA_Kharkiv = VIIRS_2021.reduceRegion( ee.Reducer.sum(), ROIKharkiv, 1000) 
print ('Kharkiv radiance 21', reducersUA_Kharkiv)
var reducersUA_Kharkiv22 = VIIRS_2022.reduceRegion( ee.Reducer.sum(), ROIKharkiv, 1000) 
print ('Kharkiv radiance 22', reducersUA_Kharkiv22)
var reducersUA_Dnipro = VIIRS_2021.reduceRegion( ee.Reducer.sum(), ROIDnipro, 1000) 
print ('Dnipro radiance 21', reducersUA_Dnipro)
var reducersUA_Dnipro22 = VIIRS_2022.reduceRegion( ee.Reducer.sum(), ROIDnipro, 1000) 
print ('Dnipro radiance 22', reducersUA_Dnipro22)
var reducersUA_Odesa = VIIRS_2021.reduceRegion( ee.Reducer.sum(), ROIOdesa, 1000) 
print ('Odesa radiance 21', reducersUA_Odesa)
var reducersUA_Odesa22 = VIIRS_2022.reduceRegion( ee.Reducer.sum(), ROIOdesa, 1000) 
print ('Odesa radiance 22', reducersUA_Odesa22)
var reducersUA_Donetsk = VIIRS_2021.reduceRegion( ee.Reducer.sum(), ROIDonetsk, 1000) 
print ('Donetsk radiance 21', reducersUA_Donetsk)
var reducersUA_Donetsk22 = VIIRS_2022.reduceRegion( ee.Reducer.sum(), ROIDonetsk, 1000) 
print ('Donetsk radiance 22', reducersUA_Donetsk22)
var reducersUA_Lublin = VIIRS_2021.reduceRegion( ee.Reducer.sum(), ROILublin, 1000) 
print ('Lublin radiance 21', reducersUA_Lublin)
var reducersUA_Lublin22 = VIIRS_2022.reduceRegion( ee.Reducer.sum(), ROILublin, 1000) 
print ('Lublin radiance 22', reducersUA_Lublin22)
var reducersUA_Budapest = VIIRS_2021.reduceRegion( ee.Reducer.sum(), ROIBudapest, 1000) 
print ('Budapest radiance 21', reducersUA_Budapest)
var reducersUA_Budapest22 = VIIRS_2022.reduceRegion( ee.Reducer.sum(), ROIBudapest, 1000) 
print ('Budapest radiance 22', reducersUA_Budapest22)
var reducersUA_Chisinau = VIIRS_2021.reduceRegion( ee.Reducer.sum(), ROIChisinau, 1000) 
print ('Chisinau radiance 21', reducersUA_Chisinau)
var reducersUA_Chisinau22 = VIIRS_2022.reduceRegion( ee.Reducer.sum(), ROIChisinau, 1000) 
print ('Chisinau radiance 22', reducersUA_Chisinau22)

//Timeseries Nightlight Single City

var VIIRS_chartUA = ui.Chart.image.seriesByRegion( VIIRS,ROIKharkiv, ee.Reducer.mean())
  .setOptions({
          title: 'VIIRS Night Light Radiance Kiev',
          hAxis: {title: 'Month', titleTextStyle: {italic: false, bold: true}},
          vAxis: {title: 'Intensity', minValue: 0},
          colors: ['red'],
        });
print(VIIRS_chartUA);

//Print Timerseries Ukraine
var VIIRS_chartUkraine = ui.Chart.image.seriesByRegion( VIIRS, country, ee.Reducer.mean())
  .setOptions({
          title: 'VIIRS Night Light Radiance Amsterdam',
          hAxis: {title: 'Month', titleTextStyle: {italic: false, bold: true}},
          vAxis: {title: 'Intensity', minValue: 0},
          colors: ['red'],
        });
//print(VIIRS_chartUkraine);



// Add population collection to count population in certain Ukrainian Cities
var population = ee.ImageCollection('CIESIN/GPWv411/GPW_UNWPP-Adjusted_Population_Count')
    .select('unwpp-adjusted_population_count');

var popDatefilter = population.filterDate('2020-01-01', '2020-12-31').mean();

// Calculate total population for ROI for 2020 (most recent)
// Here we use reduceRegion to turn the image into a single value based on your ROI. 
// The 1000 here is the scale, which is based of the pixel size (1km / pixel)

var popKiev = popDatefilter.reduceRegion( ee.Reducer.sum(), ROIKiev, 1000) 
print ('Total Population Kiev 2020', popKiev)

var popKharkiv = popDatefilter.reduceRegion( ee.Reducer.sum(), ROIKharkiv, 1000) 
print ('Total Population 2020 Kharkiv', popKharkiv)

var popDnipro = popDatefilter.reduceRegion( ee.Reducer.sum(), ROIDnipro, 1000) 
print ('Total Population 2020 Dnibro', popDnipro)

var popOdesa = popDatefilter.reduceRegion( ee.Reducer.sum(), ROIOdesa, 1000) 
print ('Total Population 2020 Odesa', popOdesa)

var popDonetsk = popDatefilter.reduceRegion( ee.Reducer.sum(), ROIDonetsk, 1000) 
print ('Total Population 2020 Donetsk', popDonetsk)

var popLublin = popDatefilter.reduceRegion( ee.Reducer.sum(), ROILublin, 1000) 
print ('Total Population 2020 Lublin', popLublin)
var popBudapest = popDatefilter.reduceRegion( ee.Reducer.sum(), ROIBudapest, 1000) 
print ('Total Population 2020 Budapest', popBudapest)
var popChisinau = popDatefilter.reduceRegion( ee.Reducer.sum(), ROIChisinau, 1000) 
print ('Total Population 2020 Budapest', popChisinau)