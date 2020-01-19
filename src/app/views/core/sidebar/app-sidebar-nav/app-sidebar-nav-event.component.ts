import { Component, Input, OnInit, Output } from '@angular/core';
import { SidebarNavHelper } from '../app-sidebar-nav.service';
import { EventEmitter } from 'events';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { DialogService } from 'src/app/services/notifications/dialog/dialog.service';

@Component({
    selector: 'app-sidebar-nav-event',
    templateUrl: './app-sidebar-nav-event.component.html'
})
export class AppSidebarNavEventComponent implements OnInit {
    @Input() item: any;


    private classes = {
        'nav-label': true,
        'active': true
    };
    private iconClasses = {};


    constructor(
        public helper: SidebarNavHelper, public dialogService: DialogService
    ) { }

    ngOnInit() {
    }
   

    execute() {
        console.log('string fired up')
        this.openDialog(this.item.event.body);
    }

    openDialog(dialogName: string) {
        console.log(dialogName)
        switch (dialogName) {
            case 'dataSourceDialog': {
                console.log('from component ')

                const dialogConfig = new MatDialogConfig()
                dialogConfig.disableClose = true;
                dialogConfig.autoFocus = true;

                break;
            }


            default: {
                break;
            }

        }

    }

}
