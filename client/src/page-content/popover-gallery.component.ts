import { Component, Input } from '@angular/core';


@Component({
    selector: 'app-popover-gallery',
    templateUrl: './popover-gallery.component.html',
})
export class PopoverGalleryComponent {

    public items: Array<any>;

    @Input('items') set setItems(items: Array<any>) {
        if (items) {
            this.items = items;
        } else {
            this.items = undefined;
        }
    }
}
