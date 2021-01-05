# data-viz-project

## Data Visualisation Project
The aim of this project is to create an interactive world map that shows how total exports have changed over time across different countries. The graph will play an animation which will change the colour of each country based on their export values.

## Technologies Used
The main technology for the visualisation will be D3.js & Leaflet.js. Using these two libraries we will deliver a data visualisation that displays a map with elements that are able to change colour depending on the underlying data.

## Data sources
- International trade data: https://dataverse.harvard.edu/dataverse/atlas
- Country border geoJSON data: https://datahub.io/core/geo-countries#pandas

## Workflow

### Data Transformation
- Perform aggregation of each product ID per country to find total export value per year
- Find out which country goes with each ISO code

### Data Loading
- Data for this project is stored in a MongoDB database

### Flask Server
- The API and the application for this project are built using the Flask framework to be locally hosted

### Using the API to visualise data
- The main visualisation is a world choropleth powered using API endpoints

### Deployment
- Application is deployed to Heroku