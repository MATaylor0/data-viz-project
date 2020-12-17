# data-viz-project

### Data Visualisation Project
The aim of this project is to create an interactive world map that shows how total exports have changed over time across different countries. The graph will play an animation which will change the colour of each country based on their export values.

### Technologies Used
The main technology for the visualisation will be D3.js & Leaflet.js. Using these two libraries we will deliver a data visualisation that displays a map with elements that are able to change colour depending on the underlying data.

### Data sources
- International trade data: https://dataverse.harvard.edu/dataverse/atlas
- Country border geoJSON data: https://datahub.io/core/geo-countries#pandas

### Workflow

1. Clean the data
	- perform aggregation of each product ID per country to find total export value per year

2. Find out which country goes with each location_code

3. Create a basic HTML with all dependencies (leaflet, d3, mapbox) linked
	- Create a simple CSS file
	- Create an app.js
	- Create the map and load the geoJSON data