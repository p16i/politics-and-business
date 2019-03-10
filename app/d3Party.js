import * as d3 from 'd3';
import * as d3Color from 'd3-scale-chromatic';
import * as d3Style from './components/d3Styles.css';

/* Mock Data */
const dataset = {
    "name": "Party xxx",
    "children": [
        {
            "Name": "Party Logo", "Count": 50, "Type": "logo",
        }
        // {"Name":"Olives","Count":4319},
        // {"Name":"Tea","Count":4159},
        // {"Name":"Mashed Potatoes","Count":2583},
        // {"Name":"Boiled Potatoes","Count":2074},
        // {"Name":"Milk","Count":1894},
        // {"Name":"Chicken Salad","Count":1809},
        // {"Name":"Vanilla Ice Cream","Count":1713},
        // {"Name":"Cocoa","Count":1636},
        // {"Name":"Lettuce Salad","Count":1566},
        // {"Name":"Lobster Salad","Count":1511},
        // {"Name":"Chocolate","Count":1489},
        // {"Name":"Apple Pie","Count":1487},
        // {"Name":"Orange Juice","Count":1423},
        // {"Name":"American Cheese","Count":1372},
        // {"Name":"Green Peas","Count":1341},
        // {"Name":"Assorted Cakes","Count":1331},
        // {"Name":"French Fried Potatoes","Count":1328},
        // {"Name":"Potato Salad","Count":1306},
        // {"Name":"Baked Potatoes","Count":1293},
        // {"Name":"Roquefort","Count":1273},
        // {"Name":"Stewed Prunes","Count":1268}
    ]
};

const orgCounts = [3, 8, 15];

for (let i = 0; i < 200; i++) { 
    dataset['children'].push({
        Name: "Mr. Politician " + i,
        Type: "politician",
        Count: 1 ,
        EventID: i,
        InvolvedWithBusiness: i < 6
    })
}

for (let j = 0; j < 30; j++){
    dataset['children'].push({
        Name: "Company " + j,
        Type: "org",
        Count:  orgCounts[Math.floor(j/10)],
        EventID: Math.floor(j / 5)
    })
}

/* end mock */
const containerNode = document.createElement('div');
const diameter = 600;

const color = d3.scaleOrdinal(d3Color.schemeCategory10);
const padding = 5;
const triangleSymbol = d3.symbol()
    .type(d3.symbolTriangle)
    .size(100)

const bubble = d3.pack(dataset)
    .size([diameter, diameter])
    .padding(padding);

const svg = d3.select(containerNode)
    .append("svg")
    .attr("width", diameter)
    .attr("height", diameter)
    .attr("class", "bubble");

const nodes = d3.hierarchy(dataset)
    .sum(function(d) { return d.Count; });

const rawNode = svg.selectAll(".node")
    .data(bubble(nodes).descendants())
    .enter()
    .filter(function(d){
        return  !d.children
    });

const avatarRadius = 200;
const defs = svg.append("defs");
    defs.append("clipPath")
      .attr("id", "avatar-clip")
      .append("circle")
      .attr("cx", avatarRadius)
      .attr("cy", avatarRadius)
      .attr("r", avatarRadius)

const polNodesData = {}
rawNode.filter((d) => d.data.Type == 'politician').each(d => {
    polNodesData[d.data.EventID] = d
});

const lines = []
rawNode.filter((d) => d.data.Type == 'org').each((d) => {
    lines.push({
        src: d,
        dest: polNodesData[d.data.EventID]
    })    
});

svg.selectAll(".line")
    .data(lines)
    .enter()
    .append("line")
    .attr("class", "link")
    .attr("x1", (d) => d.src.x)
    .attr("y1", (d) => d.src.y)
    .attr("x2", (d) => d.dest.x)
    .attr("y2", (d) => d.dest.y)
    .attr("opacity", 0.1)
    .attr("stroke-dasharray", ("3, 3"))
    .attr("stroke-width", 1)
    .attr("stroke", "black");

const node = rawNode.append("g")
    .attr("class", "node")
    .attr("transform", function(d) {
        return "translate(" + d.x + "," + d.y + ")";
    });

node.filter((d) => d.data.Type == 'org' || d.data.Type == 'logo')
    .append("circle")
    .attr("r", function(d) {
        return Math.min(d.r, 100);
    })
    
node.filter((d) => d.data.Type == 'politician')
    .append("path")
    .attr("d", triangleSymbol)
    .classed(d3Style.politician, true)
    .classed(d3Style.politicianInvolvedWithBusiness, d => d.data.InvolvedWithBusiness)
    .attr("transform", function(d) {
        let dx = diameter / 2 - d.x ;
        let dy = diameter / 2 - d.y;
        let theta = Math.atan2(dy, dx) + Math.PI/2;
        let angle = (theta > 0 ? theta : (2*Math.PI + theta)) * 360 / (2*Math.PI);

        return `rotate(${angle})`;
    });

node.filter((d) => d.data.Type == 'org')
    .style("fill", function(d, i) {
        return color(i);
    });

node.filter((d) => d.data.Type == "logo")
    .style("fill", "#FFF")
    .append("image")
    .attr("xlink:href", "https://i.imgur.com/yqeV5WK.png")
    .attr("x", (d) => -d.r)
    .attr("y", (d) => -d.r)
    .attr("z-index", 5)
    .attr("width", (d) => 2*d.r)
    .attr("height", (d) => 2*d.r);

d3.select(self.frameElement)
    .style("height", diameter + "px");

node.filter((d) => d.data.Type == "politician" || d.data.Type == "org")
    .on('mouseenter', (e) => {
        d3.selectAll(".node")
            .filter(d => {
                return d.data.EventID == e.data.EventID;
            })
            .classed(d3Style.highlight, true);

        d3.selectAll(".link")
            .filter(d => {
                return d.src.data.EventID == e.data.EventID;
            })
            .classed(d3Style.linkHighlight, true);
    });

node.on('mouseleave', (e) => {
    d3.selectAll(".node")
        .classed(d3Style.highlight, false);

    d3.selectAll(".link")
        .classed(d3Style.linkHighlight, false);
});

export default containerNode