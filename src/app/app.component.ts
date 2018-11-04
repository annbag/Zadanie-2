import {Component} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Response, Http} from '@angular/http';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
})
export class AppComponent {
    private currentCurrency: string = 'PLN';
    private exchangeData: any = [];
    private items: Array<Object>;
    private currencies: Array<string>;
    private addForm;
    private currencyForm;

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

    private addItem() {
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

    private changeCurrency(newCurrency): void {
        this.currentCurrency = newCurrency.target['value'];
    }

    private removeItem(item) {
        this.items.splice(this.items.indexOf(item), 1);
    }
}
