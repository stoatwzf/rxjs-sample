import { Observable, Subject } from 'rxjs';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/multicast';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/operator/map';

/*const button = document.querySelector('button');
const clickStream = Observable.fromEvent(button, 'click');

clickStream
	.throttleTime(2000)
	.map(event => event.clientX)
	.scan((count, clientX) => count + clientX, 0)
	.subscribe(count => console.log(count));



const arrObservable = Observable.create(observer => {
	observer.next(1);
	observer.next(2);
	observer.next(3);
	const id = setTimeout(() => {
		observer.next(4);
		observer.complete();
	}, 1000);

	return () => clearTimeout(id)
})
const subscription = arrObservable
	.subscribe(
		x => console.log(x),
		err => console.log(err),
		() => console.log('done')
	);

subscription.unsubscribe();


const intervalObservable1 = Observable.interval(300);
const intervalObservable2 = Observable.interval(400);
const intervalSubscription1 = intervalObservable1.subscribe(x => console.log(x));
const intervalSubscription2 = intervalObservable2.subscribe(x => console.log(x));

intervalSubscription1.add(intervalSubscription2);
setTimeout(() => intervalSubscription1.unsubscribe(), 1000);*/


/*const subject = new Subject();

subject.subscribe(v => console.log(`observerA: ${v}`));
subject.subscribe(v => console.log(`observerB: ${v}`));

const fromObservable = Observable.from([20, 30, 40]);

fromObservable.subscribe(subject);


const subject = new Subject();

subject.subscribe({
	next: v => console.log(`observerA: ${v}`)
});
subject.subscribe(v => console.log(`observerB ${v}`))

subject.next(1);
subject.next(2);

const observable = Observable.from([1, 2, 3]);
const subject = new Subject();
const multicasted = observable.multicast(subject);

multicasted.subscribe(v => console.log(`observerA: ${v}`));
multicasted.subscribe(v => console.log(`observerB: ${v}`));
multicasted.connect();




const observable = Observable.interval(500);
const subject = new Subject();
const multicasted = observable.multicast(subject);
let subscription1, subscription2, subscriptionConnect;

subscription1 = multicasted.subscribe(v => console.log(`observerA: ${v}`));
subscriptionConnect = multicasted.connect();
setTimeout(() => {
	subscription2 = multicasted.subscribe(v => console.log(`observerB: ${v}`));
}, 600);
setTimeout(() => {
	subscription1.unsubscribe();
}, 1200);
setTimeout(() => {
	subscription2.unsubscribe();
	subscriptionConnect.unsubscribe();
}, 2000);
*/

const observable = Observable.interval(500);
const subject = new Subject();
const refCounted = observable.multicast(subject).refCount();
let subscription1, subscription2, subscriptionConnect;

subscription1 = refCounted.subscribe(v => console.log(`observerA: ${v}`));
setTimeout(() => {
	subscription2 = refCounted.subscribe(v => console.log(`observerB: ${v}`));
}, 600);
setTimeout(() => {
	subscription1.unsubscribe();
}, 1200);
setTimeout(() => {
	subscription2.unsubscribe();
}, 2000);





