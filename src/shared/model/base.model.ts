import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from "@angular/material/snack-bar";


/*Snackbar configuration for specifying position and other extra options*/
export interface MvSnackBarConfig {
    horizontalPosition: MatSnackBarHorizontalPosition;
    verticalPosition: MatSnackBarVerticalPosition;
    actionName: string;
    multiLine: boolean;
    duration: number;
}