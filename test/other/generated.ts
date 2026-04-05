type Primitive = string | number | boolean;
type ExtractArgs<T> = Omit<T, "response"> extends infer U ? { [K in keyof U as U[K] extends undefined ? never : K]: U[K] } : never;
interface Param1Param2GetModel{search?:Record<string, unknown>;params:{param1:Primitive;param2:Primitive};response:unknown;};
const makeParam1Param2GetRequest=(args:ExtractArgs<Param1Param2GetModel>)=>({endpoint:`/${String(args.params.param1)}/${String(args.params.param2)}`,method:"GET",search:args.search})
interface HelloParam1Param2GetModel{search?:Record<string, unknown>;params:{param1:Primitive;param2:Primitive};response:unknown;};
const makeHelloParam1Param2GetRequest=(args:ExtractArgs<HelloParam1Param2GetModel>)=>({endpoint:`/hello/${String(args.params.param1)}/${String(args.params.param2)}`,method:"GET",search:args.search})
interface WorldParam1Param2GetModel{search?:Record<string, unknown>;params:{param1:Primitive;param2:Primitive};response:unknown;};
const makeWorldParam1Param2GetRequest=(args:ExtractArgs<WorldParam1Param2GetModel>)=>({endpoint:`/world/${String(args.params.param1)}/${String(args.params.param2)}`,method:"GET",search:args.search})
interface LalalaParam1Param2GetModel{search?:Record<string, unknown>;params:{param1:Primitive;param2:Primitive};response:unknown;};
const makeLalalaParam1Param2GetRequest=(args:ExtractArgs<LalalaParam1Param2GetModel>)=>({endpoint:`/lalala/${String(args.params.param1)}/${String(args.params.param2)}`,method:"GET",search:args.search})
interface YesyesParam2GetModel{search?:Record<string, unknown>;params:{param2:Primitive};response:unknown;};
const makeYesyesParam2GetRequest=(args:ExtractArgs<YesyesParam2GetModel>)=>({endpoint:`/yesyes/${String(args.params.param2)}`,method:"GET",search:args.search})
interface OkayParam1LetsgoGetModel{search?:Record<string, unknown>;params:{param1:Primitive};response:unknown;};
const makeOkayParam1LetsgoGetRequest=(args:ExtractArgs<OkayParam1LetsgoGetModel>)=>({endpoint:`/okay/${String(args.params.param1)}/letsgo`,method:"GET",search:args.search})
interface DenemeParam1Param2GetModel{search?:Record<string, unknown>;params:{param1:Primitive;param2:Primitive};response:unknown;};
const makeDenemeParam1Param2GetRequest=(args:ExtractArgs<DenemeParam1Param2GetModel>)=>({endpoint:`/deneme/${String(args.params.param1)}/${String(args.params.param2)}`,method:"GET",search:args.search})
interface WeGotThisGetModel{search?:Record<string, unknown>;response:unknown;};
const makeWeGotThisGetRequest=(args:ExtractArgs<WeGotThisGetModel>)=>({endpoint:"/we/got/this",method:"GET",search:args.search})
interface OhmyohmyGetModel{search?:Record<string, unknown>;response:unknown;};
const makeOhmyohmyGetRequest=(args:ExtractArgs<OhmyohmyGetModel>)=>({endpoint:"/ohmyohmy",method:"GET",search:args.search})
interface _2brosGetModel{search?:Record<string, unknown>;response:unknown;};
const make_2brosGetRequest=(args:ExtractArgs<_2brosGetModel>)=>({endpoint:"/2bros",method:"GET",search:args.search})
interface ChillinInAHottubGetModel{search?:Record<string, unknown>;response:unknown;};
const makeChillinInAHottubGetRequest=(args:ExtractArgs<ChillinInAHottubGetModel>)=>({endpoint:"/chillin/in/a/hottub",method:"GET",search:args.search})
interface _5FeetApartCuzTheyreNotGayGetModel{search?:Record<string, unknown>;response:unknown;};
const make_5FeetApartCuzTheyreNotGayGetRequest=(args:ExtractArgs<_5FeetApartCuzTheyreNotGayGetModel>)=>({endpoint:"/5/feet/apart/cuz/theyre/not/gay",method:"GET",search:args.search})
interface Verywild_GetModel{search?:Record<string, unknown>;params:{"*":Primitive};response:unknown;};
const makeVerywild_GetRequest=(args:ExtractArgs<Verywild_GetModel>)=>({endpoint:`/verywild/${String(args.params["*"])}`,method:"GET",search:args.search})
interface Craaaazy_GetModel{search?:Record<string, unknown>;params:{"*":Primitive};response:unknown;};
const makeCraaaazy_GetRequest=(args:ExtractArgs<Craaaazy_GetModel>)=>({endpoint:`/craaaazy/${String(args.params["*"])}`,method:"GET",search:args.search})
interface UsersPostModel{body:{address:{city:string;country:string;zip:unknown;};age:number;name:string;role:("admin"|"editor"|"viewer");tags:string[];};search?:Record<string, unknown>;response:{age:number;createdAt:string;id:string;name:string;role:("admin"|"editor"|"viewer");status:("active"|"banned"|"inactive");tags:string[];updatedAt:string;};};
const makeUsersPostRequest=(args:ExtractArgs<UsersPostModel>)=>({endpoint:"/users",method:"POST",body:args.body,search:args.search})
interface UsersGetModel{search:{limit:unknown;page:unknown;role?:("admin"|"editor"|"viewer");status?:("active"|"banned"|"inactive");};response:unknown;};
const makeUsersGetRequest=(args:ExtractArgs<UsersGetModel>)=>({endpoint:"/users",method:"GET",search:args.search})
interface UsersIdGetModel{search?:Record<string, unknown>;params:{id:string;};response:{age:number;createdAt:string;id:string;name:string;role:("admin"|"editor"|"viewer");status:("active"|"banned"|"inactive");tags:string[];updatedAt:string;};};
const makeUsersIdGetRequest=(args:ExtractArgs<UsersIdGetModel>)=>({endpoint:`/users/${String(args.params.id)}`,method:"GET",search:args.search})
interface UsersIdPutModel{body:{address:{city:string;country:string;zip:unknown;};age:number;name:string;role:("admin"|"editor"|"viewer");tags:string[];};search?:Record<string, unknown>;params:{id:string;};response:{age:number;createdAt:string;id:string;name:string;role:("admin"|"editor"|"viewer");status:("active"|"banned"|"inactive");tags:string[];updatedAt:string;};};
const makeUsersIdPutRequest=(args:ExtractArgs<UsersIdPutModel>)=>({endpoint:`/users/${String(args.params.id)}`,method:"PUT",body:args.body,search:args.search})
interface UsersIdDeleteModel{search?:Record<string, unknown>;params:{id:string;};response:unknown;};
const makeUsersIdDeleteRequest=(args:ExtractArgs<UsersIdDeleteModel>)=>({endpoint:`/users/${String(args.params.id)}`,method:"DELETE",search:args.search})
interface UsersIdPostsPostModel{body:{content:string;metadata:{category:("life"|"other"|"tech");likes:number;views:number;};published:boolean;title:string;};search?:Record<string, unknown>;params:{id:string;};response:{authorId:string;content:string;createdAt:string;id:string;metadata:{category:("life"|"other"|"tech");likes:number;views:number;};published:boolean;title:string;updatedAt:string;};};
const makeUsersIdPostsPostRequest=(args:ExtractArgs<UsersIdPostsPostModel>)=>({endpoint:`/users/${String(args.params.id)}/posts`,method:"POST",body:args.body,search:args.search})
interface OrgsPostModel{body:{name:string;owner:{role:("admin"|"editor"|"viewer");userId:string;};plan:("enterprise"|"free"|"pro");seats:number;};search?:Record<string, unknown>;response:unknown;};
const makeOrgsPostRequest=(args:ExtractArgs<OrgsPostModel>)=>({endpoint:"/orgs",method:"POST",body:args.body,search:args.search})
interface OrgsOrgIdMembersGetModel{search:{limit:unknown;page:unknown;};params:{orgId:string;};response:unknown;};
const makeOrgsOrgIdMembersGetRequest=(args:ExtractArgs<OrgsOrgIdMembersGetModel>)=>({endpoint:`/orgs/${String(args.params.orgId)}/members`,method:"GET",search:args.search})
interface OrgsOrgIdMembersMemberIdPutModel{body:{role:("admin"|"editor"|"viewer");status:("active"|"banned"|"inactive");};search?:Record<string, unknown>;params:{memberId:string;orgId:string;};response:unknown;};
const makeOrgsOrgIdMembersMemberIdPutRequest=(args:ExtractArgs<OrgsOrgIdMembersMemberIdPutModel>)=>({endpoint:`/orgs/${String(args.params.orgId)}/members/${String(args.params.memberId)}`,method:"PUT",body:args.body,search:args.search})
interface OrgsOrgIdMembersMemberIdDeleteModel{search?:Record<string, unknown>;params:{memberId:string;orgId:string;};response:unknown;};
const makeOrgsOrgIdMembersMemberIdDeleteRequest=(args:ExtractArgs<OrgsOrgIdMembersMemberIdDeleteModel>)=>({endpoint:`/orgs/${String(args.params.orgId)}/members/${String(args.params.memberId)}`,method:"DELETE",search:args.search})

interface RequestDescriptor {endpoint: string;method: string;body?: unknown;search?: Record<string, unknown>;}
class CorpusApi {
constructor(private readonly fetchFn: <R = unknown>(descriptor: RequestDescriptor) => Promise<R>) {}
param1Param2Get=(args: ExtractArgs<Param1Param2GetModel>) => this.fetchFn<Param1Param2GetModel["response"]>(makeParam1Param2GetRequest(args));
helloParam1Param2Get=(args: ExtractArgs<HelloParam1Param2GetModel>) => this.fetchFn<HelloParam1Param2GetModel["response"]>(makeHelloParam1Param2GetRequest(args));
worldParam1Param2Get=(args: ExtractArgs<WorldParam1Param2GetModel>) => this.fetchFn<WorldParam1Param2GetModel["response"]>(makeWorldParam1Param2GetRequest(args));
lalalaParam1Param2Get=(args: ExtractArgs<LalalaParam1Param2GetModel>) => this.fetchFn<LalalaParam1Param2GetModel["response"]>(makeLalalaParam1Param2GetRequest(args));
yesyesParam2Get=(args: ExtractArgs<YesyesParam2GetModel>) => this.fetchFn<YesyesParam2GetModel["response"]>(makeYesyesParam2GetRequest(args));
okayParam1LetsgoGet=(args: ExtractArgs<OkayParam1LetsgoGetModel>) => this.fetchFn<OkayParam1LetsgoGetModel["response"]>(makeOkayParam1LetsgoGetRequest(args));
denemeParam1Param2Get=(args: ExtractArgs<DenemeParam1Param2GetModel>) => this.fetchFn<DenemeParam1Param2GetModel["response"]>(makeDenemeParam1Param2GetRequest(args));
weGotThisGet=(args: ExtractArgs<WeGotThisGetModel>) => this.fetchFn<WeGotThisGetModel["response"]>(makeWeGotThisGetRequest(args));
ohmyohmyGet=(args: ExtractArgs<OhmyohmyGetModel>) => this.fetchFn<OhmyohmyGetModel["response"]>(makeOhmyohmyGetRequest(args));
_2brosGet=(args: ExtractArgs<_2brosGetModel>) => this.fetchFn<_2brosGetModel["response"]>(make_2brosGetRequest(args));
chillinInAHottubGet=(args: ExtractArgs<ChillinInAHottubGetModel>) => this.fetchFn<ChillinInAHottubGetModel["response"]>(makeChillinInAHottubGetRequest(args));
_5FeetApartCuzTheyreNotGayGet=(args: ExtractArgs<_5FeetApartCuzTheyreNotGayGetModel>) => this.fetchFn<_5FeetApartCuzTheyreNotGayGetModel["response"]>(make_5FeetApartCuzTheyreNotGayGetRequest(args));
verywild_Get=(args: ExtractArgs<Verywild_GetModel>) => this.fetchFn<Verywild_GetModel["response"]>(makeVerywild_GetRequest(args));
craaaazy_Get=(args: ExtractArgs<Craaaazy_GetModel>) => this.fetchFn<Craaaazy_GetModel["response"]>(makeCraaaazy_GetRequest(args));
usersPost=(args: ExtractArgs<UsersPostModel>) => this.fetchFn<UsersPostModel["response"]>(makeUsersPostRequest(args));
usersGet=(args: ExtractArgs<UsersGetModel>) => this.fetchFn<UsersGetModel["response"]>(makeUsersGetRequest(args));
usersIdGet=(args: ExtractArgs<UsersIdGetModel>) => this.fetchFn<UsersIdGetModel["response"]>(makeUsersIdGetRequest(args));
usersIdPut=(args: ExtractArgs<UsersIdPutModel>) => this.fetchFn<UsersIdPutModel["response"]>(makeUsersIdPutRequest(args));
usersIdDelete=(args: ExtractArgs<UsersIdDeleteModel>) => this.fetchFn<UsersIdDeleteModel["response"]>(makeUsersIdDeleteRequest(args));
usersIdPostsPost=(args: ExtractArgs<UsersIdPostsPostModel>) => this.fetchFn<UsersIdPostsPostModel["response"]>(makeUsersIdPostsPostRequest(args));
orgsPost=(args: ExtractArgs<OrgsPostModel>) => this.fetchFn<OrgsPostModel["response"]>(makeOrgsPostRequest(args));
orgsOrgIdMembersGet=(args: ExtractArgs<OrgsOrgIdMembersGetModel>) => this.fetchFn<OrgsOrgIdMembersGetModel["response"]>(makeOrgsOrgIdMembersGetRequest(args));
orgsOrgIdMembersMemberIdPut=(args: ExtractArgs<OrgsOrgIdMembersMemberIdPutModel>) => this.fetchFn<OrgsOrgIdMembersMemberIdPutModel["response"]>(makeOrgsOrgIdMembersMemberIdPutRequest(args));
orgsOrgIdMembersMemberIdDelete=(args: ExtractArgs<OrgsOrgIdMembersMemberIdDeleteModel>) => this.fetchFn<OrgsOrgIdMembersMemberIdDeleteModel["response"]>(makeOrgsOrgIdMembersMemberIdDeleteRequest(args));
}
export {CorpusApi};export type {Param1Param2GetModel, HelloParam1Param2GetModel, WorldParam1Param2GetModel, LalalaParam1Param2GetModel, YesyesParam2GetModel, OkayParam1LetsgoGetModel, DenemeParam1Param2GetModel, WeGotThisGetModel, OhmyohmyGetModel, _2brosGetModel, ChillinInAHottubGetModel, _5FeetApartCuzTheyreNotGayGetModel, Verywild_GetModel, Craaaazy_GetModel, UsersPostModel, UsersGetModel, UsersIdGetModel, UsersIdPutModel, UsersIdDeleteModel, UsersIdPostsPostModel, OrgsPostModel, OrgsOrgIdMembersGetModel, OrgsOrgIdMembersMemberIdPutModel, OrgsOrgIdMembersMemberIdDeleteModel, RequestDescriptor};export {makeParam1Param2GetRequest,makeHelloParam1Param2GetRequest,makeWorldParam1Param2GetRequest,makeLalalaParam1Param2GetRequest,makeYesyesParam2GetRequest,makeOkayParam1LetsgoGetRequest,makeDenemeParam1Param2GetRequest,makeWeGotThisGetRequest,makeOhmyohmyGetRequest,make_2brosGetRequest,makeChillinInAHottubGetRequest,make_5FeetApartCuzTheyreNotGayGetRequest,makeVerywild_GetRequest,makeCraaaazy_GetRequest,makeUsersPostRequest,makeUsersGetRequest,makeUsersIdGetRequest,makeUsersIdPutRequest,makeUsersIdDeleteRequest,makeUsersIdPostsPostRequest,makeOrgsPostRequest,makeOrgsOrgIdMembersGetRequest,makeOrgsOrgIdMembersMemberIdPutRequest,makeOrgsOrgIdMembersMemberIdDeleteRequest};