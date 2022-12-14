import {Component, Input, OnInit} from '@angular/core';
import {DataFrame, IDataFrame} from "data-forge";
import {DataService} from "../../data.service";
import {SettingsService} from "../../settings.service";
import {UniprotService} from "../../uniprot.service";
import {WebService} from "../../web.service";

@Component({
  selector: 'app-rank-plot',
  templateUrl: './rank-plot.component.html',
  styleUrls: ['./rank-plot.component.scss']
})
export class RankPlotComponent implements OnInit {
  _data: IDataFrame = new DataFrame()
  sortedDataMap: any = {}

  graphData: any[] = []
  graphLayout: any = {
    height: 700, width: 1000,
    yaxis: {title: "log2(Abundance)"},
    xaxis: {title: "Rank"},
    annotations: [],
    title: "Rank Abundance Plot",
    showlegend: true, legend: {
      orientation: 'h'
    }
  }

  legendStatus: any = {}

  @Input() set data(value: IDataFrame) {
    const processed: any[] = []
    for (const r of value) {
      const total: any = {}
      const countNotNull: any = {}
      const average: any = {}
      for (const s in this.dataService.sampleMap) {
        if (!total[this.dataService.sampleMap[s].condition]) {
          total[this.dataService.sampleMap[s].condition] = 0
          countNotNull[this.dataService.sampleMap[s].condition] = 0
        }
        if (r[s]) {
          total[this.dataService.sampleMap[s].condition] = total[this.dataService.sampleMap[s].condition] + r[s]
          countNotNull[this.dataService.sampleMap[s].condition] = countNotNull[this.dataService.sampleMap[s].condition] + 1
        }
      }
      for (const c in total) {
        if (total[c] !== 0) {
          average[c] = total[c]/countNotNull[c]
          average[c] = Math.log10(average[c])
        } else {
          average[c] = 0
        }
      }
      average[this.dataService.rawForm.primaryIDs] = r[this.dataService.rawForm.primaryIDs]
      processed.push(average)
    }
    this._data = new DataFrame(processed)
    for (const c of this._data.getColumnNames()) {
      if (c !== this.dataService.rawForm.primaryIDs) {
        this.sortedDataMap[c] = this._data.orderByDescending(a => a[c]).bake().resetIndex().bake()
      }
    }
    this.draw()
  }

  constructor(private web: WebService, public dataService: DataService, public settings: SettingsService, public uniprot: UniprotService) {
    this.dataService.selectionUpdateTrigger.asObservable().subscribe(data => {
      if (data) {
        this.draw()
      }
    })
  }

  ngOnInit(): void {
  }

  draw() {
    const temp: any = {}

    for (const i in this.sortedDataMap) {
      // @ts-ignore
      const selected = this.sortedDataMap[i].where(r => this.dataService.selected.includes(r[this.dataService.rawForm.primaryIDs]))
      // @ts-ignore
      const notSelected = this.sortedDataMap[i].where(r => !this.dataService.selected.includes(r[this.dataService.rawForm.primaryIDs]))
      if (!(i in this.legendStatus)) {
        this.legendStatus[i] = true
      }
      if (selected.count() > 0) {
        if (!(("Selected "+ i) in this.legendStatus)) {
          this.legendStatus["Selected "+ i] = true
        }
        temp["Selected "+ i] = {
          x: selected.getIndex().toArray(),
          y: selected.getSeries(i).toArray(),
          text: selected.getSeries(this.dataService.rawForm.primaryIDs).toArray().map((a: string) => {
            const r = this.uniprot.getUniprotFromPrimary(a)
            if (r) {
              return this.uniprot.getUniprotFromPrimary(a)["Gene Names"] + " [" + a +"] " + i
            } else {
              return a + " " + i
            }
          }),
          type: "scattergl",
          mode: "markers",
          name: "Selected "+ i,
          marker: {
            size: 10,
          }
        }
        if (!this.legendStatus["Selected "+i]) {
          temp["Selected "+i]["visible"] = "legendonly"
        }
      }
      temp[i] = {
        x: notSelected.getIndex().toArray(),
        y: notSelected.getSeries(i).toArray(),
        text: notSelected.getSeries(this.dataService.rawForm.primaryIDs).toArray().map((a: string) => {
          const r = this.uniprot.getUniprotFromPrimary(a)
          if (r) {
            return this.uniprot.getUniprotFromPrimary(a)["Gene Names"] + " [" + a +"]"
          } else {
            return a
          }
        }),
        type: "scattergl",
        mode: "markers",
        name: i,
        opacity: 0.3,
        marker: {
          size: 5,
        }
      }
      if (!this.legendStatus[i]) {
        temp[i]["visible"] = "legendonly"
      }
    }
    const graphData: any[] = []
    for (const i in temp) {
      if (!i.startsWith("Selected")) {
        graphData.push(temp[i])
      }
    }
    for (const i in temp) {
      if (i.startsWith("Selected")) {
        graphData.push(temp[i])
      }
    }
    this.graphData = graphData
  }

  handleClick(e: any) {
    this.legendStatus[e.event.srcElement.__data__[0].trace.name] = !this.legendStatus[e.event.srcElement.__data__[0].trace.name]
  }

  hideAllSelected() {
    for (const l in this.legendStatus) {
      if (l.startsWith("Selected")) {
        this.legendStatus[l] = false
      }
    }
    this.draw()
  }

  hideAllNonSelected() {
    for (const l in this.legendStatus) {
      if (!l.startsWith("Selected")) {
        this.legendStatus[l] = false
      }
    }
    this.draw()
  }

  downloadSVG() {
    this.web.downloadPlotlyImage("svg", "rankplot", "rankplot").then()
  }
}
