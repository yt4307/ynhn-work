(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,63374,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"warnOnce",{enumerable:!0,get:function(){return n}});let n=e=>{}},26802,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={assign:function(){return s},searchParamsToUrlQuery:function(){return i},urlQueryToSearchParams:function(){return l}};for(var o in n)Object.defineProperty(r,o,{enumerable:!0,get:n[o]});function i(e){let t={};for(let[r,n]of e.entries()){let e=t[r];void 0===e?t[r]=n:Array.isArray(e)?e.push(n):t[r]=[e,n]}return t}function a(e){return"string"==typeof e?e:("number"!=typeof e||isNaN(e))&&"boolean"!=typeof e?"":String(e)}function l(e){let t=new URLSearchParams;for(let[r,n]of Object.entries(e))if(Array.isArray(n))for(let e of n)t.append(r,a(e));else t.set(r,a(n));return t}function s(e,...t){for(let r of t){for(let t of r.keys())e.delete(t);for(let[t,n]of r.entries())e.append(t,n)}return e}},81205,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={formatUrl:function(){return l},formatWithValidation:function(){return c},urlObjectKeys:function(){return s}};for(var o in n)Object.defineProperty(r,o,{enumerable:!0,get:n[o]});let i=e.r(44066)._(e.r(26802)),a=/https?|ftp|gopher|file/;function l(e){let{auth:t,hostname:r}=e,n=e.protocol||"",o=e.pathname||"",l=e.hash||"",s=e.query||"",c=!1;t=t?encodeURIComponent(t).replace(/%3A/i,":")+"@":"",e.host?c=t+e.host:r&&(c=t+(~r.indexOf(":")?`[${r}]`:r),e.port&&(c+=":"+e.port)),s&&"object"==typeof s&&(s=String(i.urlQueryToSearchParams(s)));let u=e.search||s&&`?${s}`||"";return n&&!n.endsWith(":")&&(n+=":"),e.slashes||(!n||a.test(n))&&!1!==c?(c="//"+(c||""),o&&"/"!==o[0]&&(o="/"+o)):c||(c=""),l&&"#"!==l[0]&&(l="#"+l),u&&"?"!==u[0]&&(u="?"+u),o=o.replace(/[?#]/g,encodeURIComponent),u=u.replace("#","%23"),`${n}${c}${o}${u}${l}`}let s=["auth","hash","host","hostname","href","path","pathname","port","protocol","query","search","slashes"];function c(e){return l(e)}},43172,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"useMergedRef",{enumerable:!0,get:function(){return o}});let n=e.r(45516);function o(e,t){let r=(0,n.useRef)(null),o=(0,n.useRef)(null);return(0,n.useCallback)(n=>{if(null===n){let e=r.current;e&&(r.current=null,e());let t=o.current;t&&(o.current=null,t())}else e&&(r.current=i(e,n)),t&&(o.current=i(t,n))},[e,t])}function i(e,t){if("function"!=typeof e)return e.current=t,()=>{e.current=null};{let r=e(t);return"function"==typeof r?r:()=>e(null)}}("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},37726,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={DecodeError:function(){return y},MiddlewareNotFoundError:function(){return $},MissingStaticPage:function(){return v},NormalizeError:function(){return b},PageNotFoundError:function(){return x},SP:function(){return h},ST:function(){return m},WEB_VITALS:function(){return i},execOnce:function(){return a},getDisplayName:function(){return d},getLocationOrigin:function(){return c},getURL:function(){return u},isAbsoluteUrl:function(){return s},isResSent:function(){return p},loadGetInitialProps:function(){return g},normalizeRepeatedSlashes:function(){return f},stringifyError:function(){return k}};for(var o in n)Object.defineProperty(r,o,{enumerable:!0,get:n[o]});let i=["CLS","FCP","FID","INP","LCP","TTFB"];function a(e){let t,r=!1;return(...n)=>(r||(r=!0,t=e(...n)),t)}let l=/^[a-zA-Z][a-zA-Z\d+\-.]*?:/,s=e=>l.test(e);function c(){let{protocol:e,hostname:t,port:r}=window.location;return`${e}//${t}${r?":"+r:""}`}function u(){let{href:e}=window.location,t=c();return e.substring(t.length)}function d(e){return"string"==typeof e?e:e.displayName||e.name||"Unknown"}function p(e){return e.finished||e.headersSent}function f(e){let t=e.split("?");return t[0].replace(/\\/g,"/").replace(/\/\/+/g,"/")+(t[1]?`?${t.slice(1).join("?")}`:"")}async function g(e,t){let r=t.res||t.ctx&&t.ctx.res;if(!e.getInitialProps)return t.ctx&&t.Component?{pageProps:await g(t.Component,t.ctx)}:{};let n=await e.getInitialProps(t);if(r&&p(r))return n;if(!n)throw Object.defineProperty(Error(`"${d(e)}.getInitialProps()" should resolve to an object. But found "${n}" instead.`),"__NEXT_ERROR_CODE",{value:"E394",enumerable:!1,configurable:!0});return n}let h="undefined"!=typeof performance,m=h&&["mark","measure","getEntriesByName"].every(e=>"function"==typeof performance[e]);class y extends Error{}class b extends Error{}class x extends Error{constructor(e){super(),this.code="ENOENT",this.name="PageNotFoundError",this.message=`Cannot find module for page: ${e}`}}class v extends Error{constructor(e,t){super(),this.message=`Failed to load static file for page: ${e} ${t}`}}class $ extends Error{constructor(){super(),this.code="ENOENT",this.message="Cannot find the middleware module"}}function k(e){return JSON.stringify({message:e.message,stack:e.stack})}},64367,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"isLocalURL",{enumerable:!0,get:function(){return i}});let n=e.r(37726),o=e.r(34573);function i(e){if(!(0,n.isAbsoluteUrl)(e))return!0;try{let t=(0,n.getLocationOrigin)(),r=new URL(e,t);return r.origin===t&&(0,o.hasBasePath)(r.pathname)}catch(e){return!1}}},18658,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"errorOnce",{enumerable:!0,get:function(){return n}});let n=e=>{}},71392,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={default:function(){return y},useLinkStatus:function(){return x}};for(var o in n)Object.defineProperty(r,o,{enumerable:!0,get:n[o]});let i=e.r(44066),a=e.r(62006),l=i._(e.r(45516)),s=e.r(81205),c=e.r(22552),u=e.r(43172),d=e.r(37726),p=e.r(55215);e.r(63374);let f=e.r(97047),g=e.r(64367),h=e.r(12111);function m(e){return"string"==typeof e?e:(0,s.formatUrl)(e)}function y(t){var r;let n,o,i,[s,y]=(0,l.useOptimistic)(f.IDLE_LINK_STATUS),x=(0,l.useRef)(null),{href:v,as:$,children:k,prefetch:w=null,passHref:S,replace:j,shallow:P,scroll:_,onClick:O,onMouseEnter:T,onTouchStart:C,legacyBehavior:A=!1,onNavigate:E,ref:R,unstable_dynamicOnHover:z,...L}=t;n=k,A&&("string"==typeof n||"number"==typeof n)&&(n=(0,a.jsx)("a",{children:n}));let M=l.default.useContext(c.AppRouterContext),N=!1!==w,I=!1!==w?null===(r=w)||"auto"===r?h.FetchStrategy.PPR:h.FetchStrategy.Full:h.FetchStrategy.PPR,{href:U,as:F}=l.default.useMemo(()=>{let e=m(v);return{href:e,as:$?m($):e}},[v,$]);if(A){if(n?.$$typeof===Symbol.for("react.lazy"))throw Object.defineProperty(Error("`<Link legacyBehavior>` received a direct child that is either a Server Component, or JSX that was loaded with React.lazy(). This is not supported. Either remove legacyBehavior, or make the direct child a Client Component that renders the Link's `<a>` tag."),"__NEXT_ERROR_CODE",{value:"E863",enumerable:!1,configurable:!0});o=l.default.Children.only(n)}let q=A?o&&"object"==typeof o&&o.ref:R,H=l.default.useCallback(e=>(null!==M&&(x.current=(0,f.mountLinkInstance)(e,U,M,I,N,y)),()=>{x.current&&((0,f.unmountLinkForCurrentNavigation)(x.current),x.current=null),(0,f.unmountPrefetchableInstance)(e)}),[N,U,M,I,y]),D={ref:(0,u.useMergedRef)(H,q),onClick(t){A||"function"!=typeof O||O(t),A&&o.props&&"function"==typeof o.props.onClick&&o.props.onClick(t),!M||t.defaultPrevented||function(t,r,n,o,i,a,s){if("undefined"!=typeof window){let c,{nodeName:u}=t.currentTarget;if("A"===u.toUpperCase()&&((c=t.currentTarget.getAttribute("target"))&&"_self"!==c||t.metaKey||t.ctrlKey||t.shiftKey||t.altKey||t.nativeEvent&&2===t.nativeEvent.which)||t.currentTarget.hasAttribute("download"))return;if(!(0,g.isLocalURL)(r)){i&&(t.preventDefault(),location.replace(r));return}if(t.preventDefault(),s){let e=!1;if(s({preventDefault:()=>{e=!0}}),e)return}let{dispatchNavigateAction:d}=e.r(85334);l.default.startTransition(()=>{d(n||r,i?"replace":"push",a??!0,o.current)})}}(t,U,F,x,j,_,E)},onMouseEnter(e){A||"function"!=typeof T||T(e),A&&o.props&&"function"==typeof o.props.onMouseEnter&&o.props.onMouseEnter(e),M&&N&&(0,f.onNavigationIntent)(e.currentTarget,!0===z)},onTouchStart:function(e){A||"function"!=typeof C||C(e),A&&o.props&&"function"==typeof o.props.onTouchStart&&o.props.onTouchStart(e),M&&N&&(0,f.onNavigationIntent)(e.currentTarget,!0===z)}};return(0,d.isAbsoluteUrl)(F)?D.href=F:A&&!S&&("a"!==o.type||"href"in o.props)||(D.href=(0,p.addBasePath)(F)),i=A?l.default.cloneElement(o,D):(0,a.jsx)("a",{...L,...D,children:n}),(0,a.jsx)(b.Provider,{value:s,children:i})}e.r(18658);let b=(0,l.createContext)(f.IDLE_LINK_STATUS),x=()=>(0,l.useContext)(b);("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},52683,e=>{"use strict";var t=e.i(62006),r=e.i(71392),n=e.i(30330),o=e.i(72324),o=o,i=o,a=e.i(68670),l=e.i(82829),s=e.i(36650),c=e.i(45516),u=e.i(35166),d=/^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|disableRemotePlayback|download|draggable|encType|enterKeyHint|fetchpriority|fetchPriority|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|popover|popoverTarget|popoverTargetAction|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/,p=(0,u.default)(function(e){return d.test(e)||111===e.charCodeAt(0)&&110===e.charCodeAt(1)&&91>e.charCodeAt(2)}),f=function(e){return"theme"!==e},g=function(e){return"string"==typeof e&&e.charCodeAt(0)>96?p:f},h=function(e,t,r){var n;if(t){var o=t.shouldForwardProp;n=e.__emotion_forwardProp&&o?function(t){return e.__emotion_forwardProp(t)&&o(t)}:o}return"function"!=typeof n&&r&&(n=e.__emotion_forwardProp),n},m=function(e){var t=e.cache,r=e.serialized,n=e.isStringTag;return(0,s.registerStyles)(t,r,n),(0,l.useInsertionEffectAlwaysWithSyncFallback)(function(){return(0,s.insertStyles)(t,r,n)}),null},y=(function e(t,r){var l,u,d=t.__emotion_real===t,p=d&&t.__emotion_base||t;void 0!==r&&(l=r.label,u=r.target);var f=h(t,r,d),y=f||g(p),b=!y("as");return function(){var x=arguments,v=d&&void 0!==t.__emotion_styles?t.__emotion_styles.slice(0):[];if(void 0!==l&&v.push("label:"+l+";"),null==x[0]||void 0===x[0].raw)v.push.apply(v,x);else{var $=x[0];v.push($[0]);for(var k=x.length,w=1;w<k;w++)v.push(x[w],$[w])}var S=(0,o.w)(function(e,t,r){var n=b&&e.as||p,o="",l=[],d=e;if(null==e.theme){for(var h in d={},e)d[h]=e[h];d.theme=c.useContext(i.T)}"string"==typeof e.className?o=(0,s.getRegisteredStyles)(t.registered,l,e.className):null!=e.className&&(o=e.className+" ");var x=(0,a.serializeStyles)(v.concat(l),t.registered,d);o+=t.key+"-"+x.name,void 0!==u&&(o+=" "+u);var $=b&&void 0===f?g(n):y,k={};for(var w in e)(!b||"as"!==w)&&$(w)&&(k[w]=e[w]);return k.className=o,r&&(k.ref=r),c.createElement(c.Fragment,null,c.createElement(m,{cache:t,serialized:x,isStringTag:"string"==typeof n}),c.createElement(n,k))});return S.displayName=void 0!==l?l:"Styled("+("string"==typeof p?p:p.displayName||p.name||"Component")+")",S.defaultProps=t.defaultProps,S.__emotion_real=S,S.__emotion_base=p,S.__emotion_styles=v,S.__emotion_forwardProp=f,Object.defineProperty(S,"toString",{value:function(){return"."+u}}),S.withComponent=function(t,o){return e(t,(0,n.default)({},r,o,{shouldForwardProp:h(S,o,!0)})).apply(void 0,v)},S}}).bind(null);["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","marquee","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","title","tr","track","u","ul","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","tspan"].forEach(function(e){y[e]=y(e)});let b=y.h1`
  font-family: ${({theme:e})=>e.font.family};
  font-weight: 700;
  font-size: ${({theme:e})=>e.font.size.h1}px;
  line-height: ${({theme:e})=>e.font.lineHeight.heading};
  letter-spacing: ${({theme:e})=>e.font.letterSpacing.heading};
  margin: 0;
  position: relative;
  display: inline-block;
  cursor: default;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: ${({theme:e})=>e.space(1)};
    width: 0;
    height: 2px;
    background: ${({theme:e})=>e.color.brand[700]};
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }
`,x=y.h2`
  font-family: ${({theme:e})=>e.font.family};
  font-weight: 600;
  font-size: ${({theme:e})=>e.font.size.h2}px;
  line-height: ${({theme:e})=>e.font.lineHeight.heading};
  letter-spacing: ${({theme:e})=>e.font.letterSpacing.heading};
  margin: 0 0 ${({theme:e})=>e.space(2)};
`,v=y.p`
  font-family: ${({theme:e})=>e.font.family};
  font-size: ${({theme:e})=>e.font.size.subtitle}px;
  line-height: ${({theme:e})=>e.font.lineHeight.subtitle};
  letter-spacing: ${({theme:e})=>e.font.letterSpacing.subtitle};
  color: ${({theme:e})=>e.color.neutral[700]};
  margin: 0;
`,$=y.p`
  font-family: ${({theme:e})=>e.font.family};
  font-size: ${({theme:e})=>e.font.size.body}px;
  line-height: ${({theme:e})=>e.font.lineHeight.body};
  letter-spacing: ${({theme:e})=>e.font.letterSpacing.body};
  color: ${({theme:e})=>e.color.neutral[800]};
  margin: 0;
`,k=y($)`
  color: ${({theme:e})=>e.color.neutral[600]};
`,w=y.span`
  font-weight: 600;
  transition: letter-spacing 0.15s ease, color 0.15s ease;
  letter-spacing: 0;

  &:hover {
    letter-spacing: 0.08em;
    color: ${({theme:e})=>e.color.brand[700]};
  }
`;var S=e.i(64891),j=e.i(70464);e.i(25686);var P=e.i(62334);let _=P.gql`
  query GetWorksForHome {
    works {
      id
      title
      summary
      category
      techs
      tags
      startedAt
      endedAt
      isOngoing
    }
  }
`;async function O(){return(await j.graphqlClient.request(_)).works.slice(0,2)}P.gql`
  query GetWorks {
    works {
      id
      title
      summary
      category
      techs
      tags
      startedAt
      endedAt
      isOngoing
    }
  }
`,P.gql`
  query GetWork($id: ID!) {
    work(id: $id) {
      id
      title
      summary
      description
      thumbnail
      images
      category
      tags
      techs
      startedAt
      endedAt
      isOngoing
      # workLinks 같은 필드가 있으면 여기에 추가
    }
  }
`;let T=y.main`
  max-width: ${({theme:e})=>e.breakpoint.desktop}px;
  margin: 0 auto;
  padding: ${({theme:e})=>`${e.space(20)} ${e.space(4)} ${e.space(24)}`};

  @media (min-width: ${({theme:e})=>e.breakpoint.tablet}px) {
    padding: ${({theme:e})=>`${e.space(24)} ${e.space(8)} ${e.space(28)}`};
  }
`,C=y.section`
  margin-bottom: ${({theme:e})=>e.space(20)};
`,A=y.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({theme:e})=>e.space(2)};
  margin-top: ${({theme:e})=>e.space(4)};
  margin-bottom: ${({theme:e})=>e.space(4)};
  font-size: ${({theme:e})=>e.font.size.bodySm}px;
  line-height: ${({theme:e})=>e.font.lineHeight.body};
  letter-spacing: ${({theme:e})=>e.font.letterSpacing.body};
  color: ${({theme:e})=>e.color.neutral[600]};
`,E=y.span`
  width: 4px;
  height: 4px;
  border-radius: 999px;
  background: ${({theme:e})=>e.color.neutral[400]};
  display: inline-block;
  margin: 0 ${({theme:e})=>e.space(1)};
`,R=y.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({theme:e})=>e.space(2)};
  margin-top: ${({theme:e})=>e.space(6)};
`,z=y(r.default)`
  padding: ${({theme:e})=>`${e.space(2)} ${e.space(4)}`};
  border-radius: 999px;
  border: none;
  background: ${({theme:e})=>e.color.brand[700]};
  color: ${({theme:e})=>e.color.neutral[100]};
  font-size: ${({theme:e})=>e.font.size.body}px;
  font-weight: 500;
  letter-spacing: ${({theme:e})=>e.font.letterSpacing.subtitle};
  display: inline-flex;
  align-items: center;
  gap: ${({theme:e})=>e.space(1)};

  &:hover {
    background: ${({theme:e})=>e.color.brand[800]};
  }
`,L=y(r.default)`
  padding: ${({theme:e})=>`${e.space(2)} ${e.space(4)}`};
  border-radius: 999px;
  border: 1px solid ${({theme:e})=>e.color.brand[700]};
  background: ${({theme:e})=>e.color.neutral[100]};
  color: ${({theme:e})=>e.color.brand[700]};
  font-size: ${({theme:e})=>e.font.size.body}px;
  font-weight: 500;
  letter-spacing: ${({theme:e})=>e.font.letterSpacing.subtitle};
  display: inline-flex;
  align-items: center;
  gap: ${({theme:e})=>e.space(1)};

  &:hover {
    background: ${({theme:e})=>e.color.brand[100]};
  }
`,M=y.span`
  font-size: ${({theme:e})=>e.font.size.bodySm}px;
`,N=y.section`
  margin-bottom: ${({theme:e})=>e.space(16)};
`,I=y.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.space(4)};
  margin-top: ${({theme:e})=>e.space(4)};
`,U=y(r.default)`
  padding: ${({theme:e})=>e.space(4)};
  border-radius: ${({theme:e})=>e.space(4)};
  border: 1px solid ${({theme:e})=>e.color.neutral[300]};
  background: ${({theme:e})=>e.color.neutral[100]};
  display: block;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.15s ease;

  &:hover {
    border-color: ${({theme:e})=>e.color.brand[300]};
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
    transform: translateY(-2px);
  }
`,F=y.div`
  display: flex;
  justify-content: space-between;
  gap: ${({theme:e})=>e.space(2)};
  align-items: baseline;
  margin-bottom: ${({theme:e})=>e.space(1)};
`,q=y.h3`
  font-family: ${({theme:e})=>e.font.family};
  font-size: ${({theme:e})=>e.font.size.h3}px;
  line-height: ${({theme:e})=>e.font.lineHeight.heading};
  letter-spacing: ${({theme:e})=>e.font.letterSpacing.heading};
  margin: 0;
  font-weight: 600;
`,H=y.span`
  font-size: ${({theme:e})=>e.font.size.bodySm}px;
  line-height: ${({theme:e})=>e.font.lineHeight.body};
  letter-spacing: ${({theme:e})=>e.font.letterSpacing.body};
  color: ${({theme:e})=>e.color.neutral[600]};
  white-space: nowrap;
`,D=y($)`
  margin-top: ${({theme:e})=>e.space(1)};
`,B=y.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({theme:e})=>e.space(1)};
  margin-top: ${({theme:e})=>e.space(3)};
`,W=y.span`
  padding: ${({theme:e})=>`${e.space(1)} ${e.space(2)}`};
  border-radius: 999px;
  font-size: ${({theme:e})=>e.font.size.bodySm}px;
  line-height: ${({theme:e})=>e.font.lineHeight.body};
  letter-spacing: ${({theme:e})=>e.font.letterSpacing.body};
  background: ${({theme:e})=>e.color.brand[100]};
  color: ${({theme:e})=>e.color.brand[800]};
`,K=y(r.default)`
  display: inline-flex;
  align-items: center;
  gap: ${({theme:e})=>e.space(1)};
  margin-top: ${({theme:e})=>e.space(3)};
  font-size: ${({theme:e})=>e.font.size.body}px;
  line-height: ${({theme:e})=>e.font.lineHeight.body};
  letter-spacing: ${({theme:e})=>e.font.letterSpacing.subtitle};
  color: ${({theme:e})=>e.color.brand[700]};

  &:hover {
    text-decoration: underline;
  }
`;function X(){let{data:e,isLoading:r,isError:n}=(0,S.useQuery)({queryKey:["works","home"],queryFn:O});return(0,t.jsxs)(T,{children:[(0,t.jsxs)(C,{children:[(0,t.jsxs)(b,{children:["정연한, ",(0,t.jsx)(w,{children:"Frontend Developer"})]}),(0,t.jsxs)(v,{style:{marginTop:16},children:["Next.js, TypeScript, GraphQL을 중심으로",(0,t.jsx)("br",{}),"안정적이고 읽기 좋은 인터페이스를 만드는 개발자입니다."]}),(0,t.jsxs)(A,{children:[(0,t.jsx)("span",{children:"기술 중심 포트폴리오"}),(0,t.jsx)(E,{}),(0,t.jsx)("span",{children:"Web · Frontend · Backend"}),(0,t.jsx)(E,{}),(0,t.jsx)("span",{children:"Inha Univ. 정보통신공학"})]}),(0,t.jsxs)(R,{children:[(0,t.jsxs)(z,{href:"/works",children:["작업물 보기",(0,t.jsx)(M,{children:"↗"})]}),(0,t.jsxs)(L,{href:"/about",children:["자기소개 읽기",(0,t.jsx)(M,{children:"→"})]})]})]}),(0,t.jsxs)(N,{children:[(0,t.jsx)(x,{children:"Selected Works"}),(0,t.jsx)(k,{children:"포트폴리오에서 강조하고 싶은 프로젝트 몇 가지를 먼저 보여줍니다."}),r&&(0,t.jsx)(I,{children:(0,t.jsx)($,{children:"작업물을 불러오는 중입니다..."})}),n&&(0,t.jsx)(I,{children:(0,t.jsx)($,{children:"작업물을 불러오지 못했습니다. 나중에 다시 시도해주세요."})}),e&&e.length>0&&(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(I,{children:e.map(e=>{let r,n,o,i=[(n=(r=e=>{if(!e)return"";let[t,r]=e.split("-");return`${t}.${r}`})(e.startedAt),o=e.isOngoing?"진행 중":r(e.endedAt),(!n&&!o?"":!n&&o?o:n&&!o?n:`${n} - ${o}`)||null),e.category||null].filter(Boolean);return(0,t.jsxs)(U,{href:`/works/${e.id}`,children:[(0,t.jsxs)(F,{children:[(0,t.jsx)(q,{children:e.title}),i.length>0&&(0,t.jsx)(H,{children:i.join(" · ")})]}),e.summary&&(0,t.jsx)(D,{children:e.summary}),e.techs&&e.techs.length>0&&(0,t.jsx)(B,{children:e.techs.map(e=>(0,t.jsx)(W,{children:e},e))})]},e.id)})}),(0,t.jsxs)(K,{href:"/works",children:["모든 작업물 보기",(0,t.jsx)(M,{children:"→"})]})]}),e&&0===e.length&&!r&&!n&&(0,t.jsx)(I,{children:(0,t.jsx)($,{children:"아직 등록된 작업물이 없습니다."})})]})]})}e.s(["default",()=>X],52683)}]);