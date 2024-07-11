
const auth = 'http://localhost:4001/api/v1/'
const blockchain = 'http://localhost:5001/api/v2/'

export const SETTINGS = {
    getChain: blockchain + 'blockchain',

    login: auth + 'auth/login',
    register: auth + 'auth/register',
    lostpass: auth + 'auth/lostpassword',
    me: auth + 'auth/me'
}

export const p = {
    colors: {
        a: '#0d1625d2',
        b: '#27ae60',
        c: '#28412c',
        d: '#27ae60',
        e: '#27ae60',
        f: '#314a7783'
    },
    size: {
        reliative: {
            a: '100%',
            b: '50%'
        },
        width:{
            a: '100vw',
            b: '1200px',
            c: '900px',
            d: '400px',
        },
        height: {
            a: '100vh',
            b: '200px',
            c: '100px',
            d: '70px',
        },
        border: {
            a: '5px solid ',
            b: '1.5px solid '
        },
        font: {
            a: '6rem',
            b: '2.8rem',
            c: '2rem',
            d: '1.3rem',
            e: '0.9rem'
        }
    }
}

export const presets = {
    body: {height: p.size.height.a, width: p.size.width.a, backgroundImage: `linear-gradient(${'to top right'}, ${p.colors.c}, ${p.colors.d})`, margin: '0 auto', position: 'relative', zIndex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center'},
    header: {height: p.size.height.d, width: p.size.width.a, borderBottom: '5px solid ' + p.colors.a, display: 'flex', justifyContent: 'center', flex: '0 0 60px', margin: '0', position: 'relative', zIndex: '-1'}, //, backgroundColor: p.colors.d },
    main: {height: p.size.width.c, width: p.size.width.c, flex: '0.9', overflowY: 'auto', border: '2px', position: 'relative', zIndex: '1'},
    footer: {height: p.size.height.d, width: '100%', position: 'absolute', bottom: '0', borderTop: '10px solid ' + p.colors.d, flex: '0 0 70px', backgroundColor: p.colors.b}, //, borderTopLeftRadius: '10px'},

    section: {height: 'auto', width: 'auto', margin: 'auto', position: 'relative', zIndex: '1', display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'center'},
    nav: {height: p.size.height.d, width: '100%', margin: 'auto', display: 'flex', position: 'absolute', top: p.size.height.d, justifyContent: 'center', zIndex: '2', alignItems: 'center'}, //, border: p.size.border.b + p.colors.d},
    form: {height: p.size.reliative.b, width: p.size.width.c, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '10px'},
    input: {height: '35px', width: p.size.reliative.b, fontSize: p.size.font.d, backgroundColor: p.colors.e, border: '1px solid ' + p.colors.a},
    button: {height: '35px', width: '100px', backgroundColor: p.colors.a, borderRadius: '8px', fontSize: p.size.font.d, border: p.size.border.b + p.colors.a, cursor: 'pointer', color: p.colors.d},
    a: {height: '100%', width: '30%', marginLeft: '20px', marginRight: '20px', textDecoration: 'none', color: p.colors.a, fontSize: p.size.font.c, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center'},

    h1: {height: 'auto', width: 'auto', margin: '0', padding: '0', position: 'relative', top: '10px', color: p.colors.a, fontSize: p.size.font.a, zIndex: '-1', display: 'flex', alignItems: 'center'},
    h2: {height: 'auto', width: 'auto', margin: '0 auto', padding: '0', color: p.colors.a, fontSize: p.size.font.c},
    p: {height: 'auto', width: p.size.width.c, margin: '0 auto', padding: '0', color: p.colors.a, fontSize: p.size.font.c, backgroundColor: p.colors.d, opacity: '0.5'},

    div: {width: p.size.reliative.b, display: 'flex', margin: '0 auto'}
}

export const chain = {}