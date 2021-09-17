(()=>{"use strict";const e=KEDA,o=dat.gui,t="\nEasy text transition animations\nusing random character changes.\n\nExample usage :\n\nconst textformer = new KEDA.Textformer( {\n\t//Target\n\toutput: \"#demo-title\",\n\n\t//Texts\n\tfrom: '',\n\tto: 'Texformer',\n\n\t//Core\n\tmode: KEDA.Textformer.modes.expand,\n\tsteps: 10,\n\tstagger: 3,\n\tnoise: 2,\n\n\t//Autoplay\n\tautoplay: true,\n\tspeed: 15,\n\tdelay: 500,\n} );\n",n={output:"#demo-title",from:"",to:"Textformer",mode:e.Textformer.modes.EXPAND,steps:10,stagger:3,noise:2,origin:-1,autoplay:{speed:15,delay:500,duration:0},align:{to:e.Textformer.align.LEFT,fill:"."}},a=new e.Textformer(n),i={element:document.querySelector("#demo-paragraph"),build:()=>{i.textformer.build({...a.options,...i.getOverrides()})},getOverrides:()=>{const e=a.textform.length,o=e>0?t.length/e*.25:10;return{output:i.element,from:"",to:t,stagger:Math.ceil(a.options.stagger/o),noise:0===a.options.noise?0:a.options.noise*o}}};function s(){a.build(),i.build()}i.textformer=a.clone(i.getOverrides());const r=new o.GUI,d=r.addFolder("Textform");d.add(a.options,"from").onChange(s),d.add(a.options,"to").onChange(s),d.add(a.options,"mode",e.Textformer.modes).onChange(s),d.add(a.options,"steps",1,60).step(1).onChange(s),d.add(a.options,"stagger",0,30).step(1).onChange(s),d.add(a.options,"noise",0,30).step(1).onChange(s),d.open();const m=r.addFolder("Animation");m.add(a,"speed",1,30).step(1).onChange(s),m.add(a,"progress",0,1).step(.001).onChange((()=>i.textformer.progress=a.progress)).listen(),m.add(a,"replay").onFinishChange((()=>i.textformer.replay())),m.open();const p=r.addFolder("Advanced");p.add(a,"align",e.Textformer.align).onChange(s),p.add(a.options.align,"fill").onChange(s),p.add(a.options,"charset",e.Textformer.charsets).onChange(s),p.add(a.options.autoplay,"duration",150,1e4).step(50).onChange(s).listen(),p.add(a.options.autoplay,"delay",0,5e3).step(50).onChange(s),p.add(a.options,"origin",-1,10).step(1).onChange(s),p.open();const g=navigator.userAgent||navigator.vendor||window.opera,l=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|mediump|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(g)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(g.substr(0,4)),c=window.innerWidth<640;(l||c)&&r.close()})();