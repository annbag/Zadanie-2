import {Component} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Response, Http} from '@angular/http';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
})
export class AppComponent {
    private currentCurrency: string = 'EUR';
    private exchangeData: any = [];
    public items: Array<Object>;
    public currencies: Array<string>;
    public addForm;
    public currencyForm;

    constructor(private http: Http, private formBuilder: FormBuilder) {
        this.getExchangeRates();
        this.getItems();

        this.addForm = this.formBuilder.group({
            name: [],
            category: [],
            value: []
        });

        this.currencyForm = this.formBuilder.group({
            currency: []
        });
    }

    private getItems(): void {
        this.items = [{
            name: 'Carrot',
            category: 'vegetable',
            value: 4
        },
            {
                name: 'Orange',
                category: 'fruit',
                value: 3
            },
            {
                name: 'Potato',
                category: 'vegetable',
                value: 7
            },
            {
                name: 'Tomato',
                category: 'vegetable',
                value: 3
            },
            {
                name: 'Banana',
                category: 'fruit',
                value: 1
            }];
    }

    private getCurrencies(): Array<string> {
        const keys = Object.keys(this.exchangeData);

        return keys;
    }

    public addItem() {
        this.items.push(this.addForm.value);
    }

    private getExchangeRates(): void {
        this.http
            .request(`http://data.fixer.io/api/latest?access_key=f1aeaf9fdd72ed7bad6b4b3bd8709ad9&format=1`)
            .subscribe((res: Response) => {
                this.exchangeData = res.json().rates;
                this.currencies = this.getCurrencies();
            });

    }

    public changeCurrency(newCurrency): void {
        this.currentCurrency = newCurrency.target['value'];
    }

    public removeItem(item) {
        this.items.splice(this.items.indexOf(item), 1);
    }
    public editItem(item) {
        this.removeItem(item);
        this.addForm.setValue(item);
    }
}
