import * as d3 from 'd3';
import * as d3Color from 'd3-scale-chromatic';
import * as d3Style from './components/d3Styles.css';
import * as d3Symbol from 'd3-symbol-extra';
import { config } from './utils';
import ReactDOM from 'react-dom';

function d3Viz(dataset, props){

    const polColor = d3.scaleSequential(['#88CFFA', '#1265FB'])
        .domain([0, dataset.maxRelatedTo/8])

['#88CFFA', '#1265FB']

    const partyName = dataset.name;
    const containerNode = document.createElement('div');
    const diameter = config.d3.diameter;

    const color = d3.scaleOrdinal(d3Color.schemeCategory10);
    const padding = config.d3.padding;
    const polSymbol = d3.symbol()
        .type(d3.symbolTriangle)
        .size(config.d3.politicianSymbolSize)

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
        .filter( d => !d.children )

    const polNodesData = {}
    rawNode.filter((d) => d.data.Type == 'politician').each((d) => {
        polNodesData[d.data.EventID] = d
    })

    const lines = []
    rawNode.filter((d) => d.data.Type == 'org').each((d) => {
        lines.push({
            src: d,
            dest: polNodesData[d.data.EventID]
        })    
    });

    const tooltip = d3.select("body").append("div")
        .classed(d3Style.tooltip, true)
        .style("opacity", 0)

    const line = svg.selectAll(".line")
        .data(lines)
        .enter()
        .append("line")
        .attr("class", "link")
        .attr("x1", (d) => d.src.x)
        .attr("y1", (d) => d.src.y)
        .attr("x2", (d) => d.dest.x)
        .attr("y2", (d) => d.dest.y)
        .classed(d3Style.normalLink, true)

    const node = rawNode.append("g")
        .attr("class", "node")
        .attr("transform", d => {
            return "translate(" + d.x + "," + d.y + ")";
        });

    node.filter((d) => d.data.Type == 'org' || d.data.Type == 'logo')
        .append("circle")
        .attr("r", function(d) {
            return Math.min(d.r, config.d3.circleMaxSize);
        })
        
    node.filter((d) => d.data.Type == 'politician')
        .append("path")
        .attr("d", polSymbol)
        .classed(d3Style.politician, true)
        .classed(d3Style.politicianInvolvedWithBusiness, d => d.data.relatedTo.length > 0)
        .attr("transform", function(d) {
            let dx = diameter / 2 - d.x ;
            let dy = diameter / 2 - d.y;
            let theta = Math.atan2(dy, dx) + Math.PI/2;
            let angle = (theta > 0 ? theta : (2*Math.PI + theta)) * 360 / (2*Math.PI);

            return `rotate(${angle})`;
        })
        .style("fill", d => polColor(d.data.relatedTo.length))

    node.filter((d) => d.data.Type == 'org')
        .style("fill", d => config.colorSchemes.businessType[d.data.JP_TYPE_CODE]);

    node.filter((d) => d.data.Type == "logo")
        .style("fill", "none")

    d3.select(self.frameElement)
        .style("height", diameter + "px");

    const polOrgNodes = node.filter((d) => d.data.Type == "politician" || d.data.Type == "org")


    const highlightForEvent = (eid, bbBox) => {
        d3.selectAll(`.${d3Style.selectionTooltip}`)
            .remove();

        if(eid){
            polOrgNodes
                .filter(d => d.data.EventID !== eid)
                .style('opacity', config.d3.inactiveOpacity)

            const pp = polOrgNodes
                .filter(d => d.data.EventID === eid)
                .style('opacity', 1)

            line.classed(d3Style.permanentLinkHighlight, false)
                .filter(d => d.src.data.EventID === eid)
                .classed(d3Style.permanentLinkHighlight, true)

            const data = pp.data().filter(d=>d.data.Type == 'politician');

            d3.select('body')
                .select()
                .data(data)
                .enter()
                .append("div")
                .classed('selection-tooltip', true)
                .classed(d3Style.selectionTooltip, true)
                .style('left', d => `${d.x + 20 + bbBox.x}px`)
                .style('top', d => `${d.y + 20 + bbBox.y}px`)
                .text(d => d.data.Type === 'org' ? d.data.JP_TNAME: d.data.name);
            tooltip.style('opacity', 0);
        } else {
            polOrgNodes.style('opacity', 1)
            line.classed(d3Style.permanentLinkHighlight, false)
        }

    }

    polOrgNodes
        .style('cursor', 'pointer')
        .on('click', (d) => {
            let e = {
                partyName: partyName,
                EventId: d.data.EventID
            };

            let newHash = ''
            if(d.data.Type === 'org'){
                e['orgID'] = d.data._id;
                newHash = `/p/${partyName}/org/${d.data._id}`
            } else {
                newHash = `/p/${partyName}/person/${d.data.name}`
            }

            props.history.push(newHash);
        })
        .on('mouseenter', (e) => {
            d3.selectAll(".node")
                .filter(d => {
                    return d.data.EventID == e.data.EventID;
                })
                .classed(d3Style.highlight, true);

            d3.selectAll(".link").filter(d => {
                    return d.src.data.EventID == e.data.EventID;
                })
                .classed(d3Style.linkHighlight, true);

            let tooltipText = '';
            if(e.data.Type === 'org'){
                tooltipText = e.data.JP_TNAME;
            } else {
                tooltipText = e.data.name;
            }

            tooltip.transition()
                .duration(200)
                .style('left', `${d3.event.pageX+40}px`)
                .style('top', `${d3.event.pageY-20}px`)
                .style("opacity", .9)
                .text(tooltipText)
        });

    node.on('mouseout', (e) => {
        tooltip.transition()
            .duration(200)
            .style('opacity', 0);

        d3.selectAll(".node")
            .classed(d3Style.highlight, false);

        d3.selectAll(".link")
            .classed(d3Style.linkHighlight, false);
    });

    return {
        containerNode: containerNode,
        highlightForEvent: highlightForEvent
    }
}

export default d3Viz;