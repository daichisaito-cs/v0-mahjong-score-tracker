type UpsertOptions = { onConflict: string; ignoreDuplicates: true }

export type QueryPlan = { table: string; action: string; values?: any; upsertOptions?: UpsertOptions; select?: string; filters: any[]; orders: any[]; limit?: number; offset?: number; single?: string }
export class Query implements PromiseLike<any> {
  plan: QueryPlan
  constructor(table: string, private execute: (plan: QueryPlan) => Promise<any>) { this.plan={table,action:'select',filters:[],orders:[]} }
  select(select='*') { this.plan.select=select; return this }
  insert(values:any) { this.plan.action='insert';this.plan.values=values;return this }
  upsert(values: any, options: UpsertOptions) {
    this.plan.action = 'upsert'
    this.plan.values = values
    this.plan.upsertOptions = options
    return this
  }
  update(values:any) { this.plan.action='update';this.plan.values=values;return this }
  delete() { this.plan.action='delete';return this }
  eq(key:string,value:any) { this.plan.filters.push({key,op:'eq',value});return this }
  in(key:string,value:any[]) { this.plan.filters.push({key,op:'in',value});return this }
  not(key:string,op:string,value:any) { this.plan.filters.push({key,op:'not.'+op,value});return this }
  or(value:string) { this.plan.filters.push({op:'or',value});return this }
  order(key:string,options:{ascending?:boolean}={}) {this.plan.orders.push({key,ascending:options.ascending!==false});return this}
  limit(value:number) {this.plan.limit=value;return this}
  range(from:number,to:number) {this.plan.offset=from;this.plan.limit=to-from+1;return this}
  single() {this.plan.single='required';return this}
  maybeSingle() {this.plan.single='optional';return this}
  then<T=any,U=never>(yes?:((v:any)=>T|PromiseLike<T>)|null,no?:((e:any)=>U|PromiseLike<U>)|null):PromiseLike<T|U> {return this.execute(this.plan).then(yes,no)}
}
