import {Component, Input, OnInit} from '@angular/core';
import {WebService} from "../../web.service";
import {UniprotService} from "../../uniprot.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-proteomics-db',
  templateUrl: './proteomics-db.component.html',
  styleUrls: ['./proteomics-db.component.scss']
})
export class ProteomicsDbComponent implements OnInit {
  _uniprotID = ""
  @Input() set uniprotID(value: string) {
    this._uniprotID = value
    if (this._uniprotID !== "") {
      this.web.getProteomicsData(this._uniprotID, this.form.value["selected"]).then(r => {
        r.subscribe(data => {
          console.log(data)
          if (data) {
            this.drawBarChart(data)
          }
        })
      })
    }
  }

  form: FormGroup = this.fb.group({
    selected: "tissue"
  })

  graphData: any[] = []
  graphLayout: any = {}
  constructor(public web: WebService, private uniprot: UniprotService, private fb: FormBuilder) {
    this.form.valueChanges.subscribe(value => {
      this.web.getProteomicsData(this._uniprotID, value.selected).then(r => {
        r.subscribe(data => {
          if (data) {
            this.drawBarChart(data)
          }
        })
      })
    })
  }

  ngOnInit(): void {
  }

  drawBarChart(data: any) {
    let graphData: any[] = []
    const graphLayout = {
      title: {
        text: "",
        font: {
          family: "Arial Black",
          size: 24,
        }
      },
      margin: {l:300, r:50, t:50, b:50},
      height: 400,
      xaxis: {
        "title": "<b>Normalized Intensity</b>"
      },
      yaxis: {
        "title" : "<b>Sample Categories</b>",
        "type" : "category",
        "tickmode": "array",
        "tickvals": [],
        "tickfont": {
          "size": 17,
          "color": 'black'
        }
      }
    }
    graphLayout.yaxis.tickvals = []
    if (data) {
      // @ts-ignore
      if (data["d"]) {
        // @ts-ignore
        if (data["d"]["results"]) {
          const x: any = []
          const y: any = []

          const results: any[] = []
          // @ts-ignore
          for (const r of data["d"]["results"] ) {
            results.push({value: parseFloat(r["NORMALIZED_INTENSITY"]), name: r["TISSUE_NAME"]})
          }
          results.sort((a, b) => (a.value > b.value) ? 1: -1)
          for (const r of results) {
            x.push(r.value)
            y.push(r.name)
          }
          const temp: any = {
            type: "bar",
            x: x,
            y: y,
            marker: {
              color: "rgb(128,51,169)"
            },
            orientation: "h"
          }
          graphData = [temp]
          graphLayout.yaxis.tickvals = temp.y
          graphLayout.height = 400 + 25*temp.y.length
          this.graphData = graphData
          this.graphLayout = graphLayout
        }
      }
    }
  }
  downloadSVG() {
    this.web.downloadPlotlyImage("svg", "proteomicsDB", this._uniprotID+"bar").then()
  }
}
