import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import * as PlotlyJS from 'plotly.js-dist-min';
import { PlotlyModule } from 'angular-plotly.js';
import { FileUploaderComponent } from './components/file-uploader/file-uploader.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ScatterPlotComponent } from './components/scatter-plot/scatter-plot.component';
import { DatatableViewerComponent } from './components/datatable-viewer/datatable-viewer.component';
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import { ComparisonViewerComponent } from './components/comparison-viewer/comparison-viewer.component';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { DistributionViewerComponent } from './components/distribution-viewer/distribution-viewer.component';
import { ProfilePlotComponent } from './components/profile-plot/profile-plot.component';
import { StringAnalysisComponent } from './components/string-analysis/string-analysis.component';
import { InteractionDatatableComponent } from './components/interaction-datatable/interaction-datatable.component';
import { HomeComponent } from './components/home/home.component';
import { NotificationComponent } from './components/notification/notification.component';
import { NotificationContainerComponent } from './components/notification-container/notification-container.component';
import { BarChartAverageComponent } from './components/bar-chart-average/bar-chart-average.component';
import { BarChartSwitchComponent } from './components/bar-chart-switch/bar-chart-switch.component';
import { ProteinDomainComponent } from './components/protein-domain/protein-domain.component';
import {NguiInviewModule, NguiListModule, NguiUtilsModule} from "@ngui/common";
import { StringdbInteractComponent } from './components/stringdb-interact/stringdb-interact.component';
import { ProteomicsDbExpressionComponent } from './components/proteomics-db-expression/proteomics-db-expression.component';
import { PdbViewerComponent } from './components/pdb-viewer/pdb-viewer.component';
import { InteractomeComponent } from './components/interactome/interactome.component';
import { CytoplotComponent } from './components/cytoplot/cytoplot.component';
import {ColorPickerModule} from "ngx-color-picker";
import {VolcanoColorGroupsComponent} from "./components/volcano-color-groups/volcano-color-groups.component";
import { ProteinRelationshipComponent } from './components/protein-relationship/protein-relationship.component';

PlotlyModule.plotlyjs = PlotlyJS;

@NgModule({
  declarations: [
    AppComponent,
    FileUploaderComponent,
    ScatterPlotComponent,
    DatatableViewerComponent,
    ComparisonViewerComponent,
    BarChartComponent,
    DistributionViewerComponent,
    ProfilePlotComponent,
    StringAnalysisComponent,
    InteractionDatatableComponent,
    HomeComponent,
    NotificationComponent,
    NotificationContainerComponent,
    BarChartAverageComponent,
    BarChartSwitchComponent,
    ProteinDomainComponent,
    StringdbInteractComponent,
    ProteomicsDbExpressionComponent,
    PdbViewerComponent,
    InteractomeComponent,
    CytoplotComponent,
    VolcanoColorGroupsComponent,
    ProteinRelationshipComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PlotlyModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxDatatableModule,
    NguiListModule,
    NguiInviewModule,
    NguiUtilsModule,
    ColorPickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
