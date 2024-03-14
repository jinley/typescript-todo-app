export interface IListItem {
    id: string;
    item: string;
    checked: boolean;
}

export default class ListItem implements IListItem {
    constructor(
        private _id: string = '', // class 내에서만 사용 위해 언더바 붙임
        private _item: string = '',
        private _checked: boolean = false
    ) {}

    // get: 다른 곳에서 값을 받아올 때 set: 해당 값을 재설정 할 때
    get id(): string {
        return this._id
    }

    set id(id: string) {
        this._id = id; 
    }

    get item(): string {
        return this._item
    }

    set item(item: string) {
        this._item = item;
    }

    get checked(): boolean {
        return this._checked
    }

    set checked(checked: boolean) {
        this._checked = checked;
    }

}