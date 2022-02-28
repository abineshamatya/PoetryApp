import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MvSnackBarConfig } from "../model/base.model";

@Injectable({
    providedIn: 'root'
})
export class UtilityService {
    constructor(public snackBar: MatSnackBar) {

    }

    /********************Get Author or Person Initial Name - Start ***********************************/
    getPersonInitialName(name: string) {
        let fullName: string[] = [];
        let initials: string = "BEP"!;
        if (name) {
            fullName = name.split(' ');
        }
        if (fullName.length > 0) {
            initials = fullName.length === 1 ? fullName.shift()?.charAt(0).toString()! : fullName.shift()?.charAt(0).toString()! + fullName.pop()?.charAt(0).toString()!;
        }

        return initials.toUpperCase();
    }
    /********************Get Author or Person Initial Name - End ***********************************/

    /********************Generate Random Color-Start ***********************************/
    getRandomColor() {
        var color = Math.floor(0x1000000 * Math.random()).toString(16);
        return '#' + ('000000' + color).slice(-6);
    }
    /********************Generate Random Color-End ***********************************/


    /********************SnackBar-Start ***********************************/
    callSnackBar(message: string, sType?: string, config?: MvSnackBarConfig) {
        if (!config) {
            config = <MvSnackBarConfig>{};
        }
        let classArray: Array<string> = [];
        let panelClass: string = 'default-sb-type';//for default panel class
        let snackBarType: string = sType ? sType.toLowerCase().trim() : '';
        switch (snackBarType) {
            case 'success':
                panelClass = 'success-sb-type';
                break;
            case 'error':
                panelClass = 'error-sb-type';
                break;
            case 'warning':
                panelClass = 'warning-sb-type';
                break;
            case 'info':
                panelClass = 'info-sb-type';
                break;
            default:
                break;

        }
        classArray.push(panelClass);

        if (config.multiLine) {
            classArray.push('multilineSnackbar');
        }

        //console.log("panelclass", panelClass);
        this.snackBar.open(message, 'x', {
            duration: config.duration ? config.duration : 5000,
            verticalPosition: config.verticalPosition ? config.verticalPosition : 'top',
            horizontalPosition: config.horizontalPosition ? config.horizontalPosition : 'center',
            panelClass: classArray
        });
    }
}