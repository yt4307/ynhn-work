(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,46669,e=>{"use strict";var r=e.i(62006),i=e.i(64891),s=e.i(70464);async function n(){let e=`
    query {
      works {
        id
        title
        summary
      }
    }
  `;return s.graphqlClient.request(e).then(e=>e.works)}function t(){let{data:e,isLoading:s,error:t}=(0,i.useQuery)({queryKey:["works"],queryFn:n});return s?(0,r.jsx)("div",{children:"로딩 중..."}):t?(console.error("GraphQL error:",t),(0,r.jsxs)("div",{children:["에러가 발생했습니다.",(0,r.jsx)("pre",{style:{whiteSpace:"pre-wrap",marginTop:16},children:String(t.message??t)})]})):e?(0,r.jsxs)("main",{children:[(0,r.jsx)("h1",{children:"Works"}),(0,r.jsx)("ul",{children:e.map(e=>(0,r.jsx)("li",{children:e.title},e.id))})]}):(0,r.jsx)("div",{children:"데이터 없음"})}e.s(["default",()=>t])}]);