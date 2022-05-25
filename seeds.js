const   mongoose    =   require('mongoose'),
        Music       =   require('./models/music');
        Artist      =   require("./models/artist");
        Song        =   require("./models/song");
        Trending    =   require("./models/trending")

const artist = [
            {
                fullname : 'Ta Thitipong',
                img : './image/ta.gif',
                album : 'สักหมัดป่าวน้อง'
            }
            ,
            {
                fullname : 'Beam Kantinan',
                img : './image/beam.png',
                album : 'ขวัญใจด่านตรวจ'
            }
            ,
            {
                fullname : 'Ukai Jirasika',
                img : './image/ukai.jpg',
                album : 'สาวนาสั่งแฟน'
            }
            , 
            {
                fullname : 'Thun Thunyathep',
                img : './image/thun2.gif',
                album : 'เมียไม่มี เอวดีเข้าสู้'
            }
]

const song = [
            {
                title: 'เป็นได้ทุกอย่าง',
                artist: 'URBOYTJ',
                lyrics: '',
                cover: './image/เป็นได้ทุกอย่าง.jpg',
                music: './song/เป็นได้ทุกอย่าง.mp3'
            }
            ,
            {
                title: 'คนไกล',
                artist: 'Patrickananda',
                lyrics: '',
                cover: './image/คนไกล.jpg',
                music: './song/คนไกล.mp3'
            }
            ,
            {
                title: 'คำถาม',
                artist: 'PUNYARB',
                lyrics: '',
                cover: './image/คำถาม.jpg',
                music: './song/คำถาม.mp3'
            }
            ,
            {
                title: 'ถ้าเราเจอกันอีก',
                artist: 'Tilly Birds',
                lyrics: '',
                cover: './image/ถ้าเราเจอกันอีก.jpg',
                music: './song/ถ้าเราเจอกันอีก.mp3'
            }
            ,
            {
                title: 'Wish',
                artist: 'Blackbeans',
                lyrics: '',
                cover: './image/wish.jpg',
                music: './song/wish.mp3'
            }
            ,
            {
                title: 'ร(W8)',
                artist: 'GENE KASIDIT',
                lyrics: ' ',
                cover: './image/w8.jpg',
                music: ' '
            }
            ,
            {
                title: 'แก้มน้องนางนั้นแดงกว่าใคร',
                artist: 'เขียนไขและวานิช',
                lyrics: '',
                cover: './image/แก้ม.jpg',
                music: ''
            }
            ,
            {
                title: 'แพงน้อง',
                artist: 'SOPHANA x GX2',
                lyrics: '',
                cover: './image/แพงน้อง.jpg',
                music: ''
            }
            ,
            {
                title: 'คอแห้ง',
                artist: 'F.HERO x Ja Nongpanee',
                lyrics: '',
                cover: './image/คอแห้ง.jpg',
                music: ''
            }
            ,
            {
                title: 'ถ้าเธอ',
                artist: 'STAMP & Violette Wautier',
                lyrics: '',
                cover: './image/ถ้าเธอ.jpg',
                music: ''
            }
            ,
            {
                title: 'ระยะหัวใจ',
                artist: 'FLUKIE',
                lyrics: '',
                cover: './image/ระยะหัวใจ.jpg',
                music: ''
            }
            ,
            {
                title: 'อะไรก็ยอม',
                artist: 'SARUN',
                lyrics: '',
                cover: './image/อะไรก็ยอม.jpg',
                music: ''
            }
            ,
            {
                title: 'อาหมวยหาย',
                artist: 'THE TOYS',
                lyrics: '',
                cover: './image/อาหมวยหาย.jpg',
                music: ''
            }
]
const trending = [
        {
            title: 'เป็นได้ทุกอย่าง',
            artist: 'URBOYTJ',
            lyrics: `ชอบชวนให้เป็นเพื่อนเธอไปดูหนัง
            ชอบชวนไปทำอะไรกันทั้งวัน
            แต่บางทีเธอก็หายไปเสียงั้น
            ตามเกมเธอไม่ทันแต่ฉันก็พร้อมจะรับมือ
            บางวันเธอเรียกฉันพี่ได้เลยน้อง
            เจอไรไม่ค่อยเข้าใจก็มาฟ้องอะ
            บางวันเธอไม่สนใจเธอไม่มอง
            ตามใจเธอละกันฉันไม่เคยเรียกร้องใดใด
            ก็เป็น Wikipedia ตอนที่เธอเกิดอยากรู้อะไร
            เป็น Google Map ตอนที่เธออยากจะไปที่ไหนต่อไหน
            แปลงร่างเป็น Grab Bike ต้องการอะไรอีกไหม
            อยากให้เป็นมากกว่านั้น
            งั้นต้องเป็นแฟนกันแล้วปะ
            เป็นให้เธอได้นะก็ฉันเป็นได้ทุกอย่าง
            Oh baby baby
            คนที่จะเป็นให้เธอแค่ที่พัก
            คนที่จะรอให้เธอนะมารัก
            เป็นคนที่รักเธอ
            บอกแล้วว่าฉันเป็นได้ทุกอย่าง
            Yeah
            Let's go
            ฉันไม่ได้มีอะไรที่เหนือกว่าธรรมชาติ
            My superpower มันไม่มีอะไรแค่เศษกระดาษ
            ที่เสกให้เธออยากได้อะไรก็ได้ในทุกทุกอย่าง
            Cause the money is my power ถึงจะมีแค่ไม่กี่บาท
            แต่ว่าฉันก็มีแบบไม่ขาดไม่ทำให้เธอต้องเหงา
            ถ้าอยากได้มากกว่านี้ขอเพียงแค่เข้ามาเอา
            เป็นให้เธอทุกอย่างนะและเป็นให้ทุกทุกวันอะ
            อยู่ที่เธอจะเป็นในสิ่งที่ฉันต้องการได้หรือเปล่า
            ก็เป็น Wikipedia ตอนที่เธอเกิดอยากรู้อะไร
            เป็น Google Map ตอนที่เธออยากจะไปที่ไหนต่อไหน
            แปลงร่างเป็น Grab Bike ต้องการอะไรอีกไหม
            อยากให้เป็นมากกว่านั้น
            งั้นต้องเป็นแฟนกันแล้วปะ
            เป็นให้เธอได้นะก็ฉันเป็นได้ทุกอย่าง
            Oh baby baby
            คนที่จะเป็นให้เธอแค่ที่พัก
            คนที่จะรอให้เธอนะมารัก
            เป็นคนที่รักเธอบอกแล้ว
            ว่าฉันเป็นได้ทุกอย่าง
            ก็เป็นทุกอย่างแล้ว
            เป็นให้ทุกอย่างแล้ว
            ถ้าให้เป็นมากกว่านี้
            ก็คงต้องเป็นเเฟนกันแล้ว (โอะโอ)
            อยากให้เป็นมากกว่านั้น
            งั้นต้องเป็นแฟนกันแล้วปะ (เอ เอ โอเคไหม)
            เป็นให้เธอได้นะก็ฉันเป็นได้ทุกอย่าง
            I can be your everything right now
            คนที่จะเป็นให้เธอแค่ที่พัก
            คนที่จะรอให้เธอนะมารัก
            เป็นคนที่รักเธอบอกแล้ว
            ว่าฉันเป็นได้ทุกอย่าง
            จะเป็น Wikipedia ตอนที่เธอเกิดอยากรู้อะไร
            เป็น Google Map ตอนที่เธออยากจะไปที่ไหนต่อไหน
            โอโอโวอูวูอู เย้เย
            คนที่จะเป็นให้เธอแค่ที่พัก
            Imma Imma Imma be your everything
            เป็นคนที่รักเธอบอกแล้ว
            ว่าฉันเป็นได้ทุกอย่าง`,
            cover: './image/เป็นได้ทุกอย่าง.jpg',
            music: './song/เป็นได้ทุกอย่าง.mp3'
        }
        ,
        {
            title: 'คนไกล',
            artist: 'Patrickananda',
            lyrics: '',
            cover: './image/คนไกล.jpg',
            music: './song/คนไกล.mp3'
        }
        ,
        {
            title: 'คำถาม',
            artist: 'PUNYARB',
            lyrics: '',
            cover: './image/คำถาม.jpg',
            music: './song/คำถาม.mp3'
        }
        ,
        {
            title: 'ถ้าเราเจอกันอีก',
            artist: 'Tilly Birds',
            lyrics: '',
            cover: './image/ถ้าเราเจอกันอีก.jpg',
            music: './song/ถ้าเราเจอกันอีก.mp3'
        }
        ,
        {
            title: 'Wish',
            artist: 'Blackbeans',
            lyrics: '',
            cover: './image/wish.jpg',
            music: './song/wish.mp3'
        }
]

function seedDB(){
    Artist.remove({},function(err){
        if(err){
            console.log(err)
        } else {
            console.log('Data removal complete');
            Song.remove({},function(err){
                if(err){
                    console.log(err)
                } else {
                    console.log('Data removal complete');
                    Trending.remove({},function(err){
                        if(err){
                            console.log(err)
                        } else{
                            console.log('Data removal complete');
                            artist.forEach(function(seed){
                                Artist.create(seed,function(err, artist){
                                    if(err){
                                        console.log(err);
                                    }
                                    else{
                                        console.log('new artist added');
                                        
                                    }
                                });
                            });
                            song.forEach(function(seed){
                                Song.create(seed,function(err, song){
                                    if(err){
                                        console.log(err);
                                    }else{
                                        console.log('new song added');
                                    }
                                }); 
                            }); 
                            trending.forEach(function(seed){
                                Trending.create(seed,function(err, song){
                                    if(err){
                                        console.log(err);
                                    }else{
                                        console.log('new trending added');
                                    }
                                }); 
                            }); 
                        }
                    });
                }
            });
        }
    });
}
module.exports = seedDB;