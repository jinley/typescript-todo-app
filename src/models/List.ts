import { IListItem } from "./ListItem";

interface IList {
    list: IListItem[],
    load(): void, // load 함수: list data들을 가져옴
    save(): void, // 리턴값은 없으므로 void로 설정
    clearList(): void,
    addItem(itemObj: IListItem): void,
    removeItem(id: string): void,
}


export default class List implements IList {

    static instance: List = new List(); // private이라 외부에서 인스턴스 생성이 불가하므로 static을 이용해 인스턴스를 생성함
    
    private constructor( // js에서 처럼 class로 instance를 생성하는 것이 아닌 단일 리스트를 이용할 것(singleton pattern)
        private _list: IListItem[] = [] // Todo를 입력 전 처음에는 빈 배열임
    ) {}

    get list(): IListItem[] {
        return this._list;
    }

    load(): void { // 로컬 스토리지에서 데이터 가져오기
        const storedList: string | null = localStorage.getItem('') // 문자열 혹은 아예 값을 안 넣은 경우도 있을 수 있으므로 타입은 string | null
        
        if(typeof storedList !== 'string') return;

        const parsedList: {
            _id: string,
            _item: string,
            _checked: boolean
        } [] = JSON.parse(storedList); // parsedList는 배열로 반환이 됨

        // listItem 인스턴스 객체 생성 => list 인스턴스 객체에 넣어주기

            parsedList.forEach(itemObj => {
             const newListItem = new ListItem(
                    itemObj._id,
                    itemObj._item,
                    itemObj._checked
                )

                List.instance.addItem(newListItem)

            })

    }

    save(): void {
        localStorage.setItem('myList', JSON.stringify(this._list))
    } 

    clearLIst(): void {
        this._list =§ [];
        this.save();
    }

    removeItem(id: string): void {
        this._list = this._list.filter(item => item.id !== id);
        this.save();
    }


    // 입력값을 로컬 스토리지에 추가하기
    addItem(itemObj: IListItem): void {
        this._list.push(itemObj);
        this.save();
    }
}