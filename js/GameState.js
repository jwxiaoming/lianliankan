var myPlayLevel = "";
(function(){

    //	var gameInst = null;
    var isDebug = false;
    var mySelf = null;
    
    FZ.Game.GameState = new (FZ.newClass({
        StateName: FZ.StateDefs.GAME_STATE_GAME_IN,
        
        CUR_UI_DEFS: ["gameIn_BG", "TIME_EMPTY", "TIME_FULL","NUM_LEVEL_10","NUM_LEVEL_0", "ARROW_UP_DOWN", "ARROW_LEFT_RIGHT", "ARROW_DOWN", "ARROW_RIGHT", "ARROW_LEFT", "ARROW_UP",
        "score_1", "score_2", "score_3", "score_4", "score_5",/*"coin","Box",*/"star"],
        UI_ARROW_START_INDEX: 5,
        UI_ARROW_KINDS: 6,
        UI_SCORE_START_INDEX: 11,
        UI_TIME_BAR_INDEX: 2,
        UI_LEVEL_TEN_INDEX: 3,
        UI_LEVEL_NUM_INDEX: 4,
        MUSIC_Play: false,

        BTN_HINT_INDEX: 0,
        BTN_PAUSE_INDEX: 1,
        BTN_START_INDEX: 2,
        
	    CUR_BTN_DEFS: [["BTN_HINT", "BTN_HINT"], ["BTN_PAUSE", "BTN_PAUSE"],["return","return"],["restart","restart"]],
        CUR_BTN_ANDROID_DEFS: [["BTN_HINT", "BTN_HINT"], ["BTN_PAUSE", "BTN_PAUSE"],["return","return"],["restart","restart"]],
        CUR_SWITCH_DEFS: ["BTN_GAME_BACK", "BTN_GAME_BACK"],
        m_isNoMatch: false,
        m_label_list: null,
        m_levelStart: false,
        
        m_diamondMgr: null,
        m_load_ui: false,
        //		m_start_time : 0,
        m_curLevel_div: null,
        m_curLevel10_div: null,
        m_next_state: "",
        m_slide_menu: null,
        
        m_hint_num_div: null,
        
        m_pause_div: null,
        m_str_nomatch_div: null,
        m_time_bar_div: null,
        m_time_bar_w: 0,
        
        m_call_tStart: null,
        m_call_mClick: null,
        m_call_time: null,
        m_level_usedTime: 0,
        levelStartTime: 0,
        levelCurrentTime: 0,
        levelPauseStartTime: 0,
        levelPauseEndTime: 0,
        levelPauseTime: 0,
        curLevelUsedTime: 0,
        m_showPage:false,
        m_gamePause: false,
        pageHiddin: false,
        STR_SCORE_RECT: [120, 28, 50, 20],
        STR_TIME_RECT: [120, 48, 50, 20],
        COLOR_YELLOW:"#F0D751",
		COLOR_BROWN:"#B97F00",
		COLOR_ORANGE:"#FFC72A",
		COLOR_PAUSE:"#c2fa41",
		COLOR_NOMATCH:"#ffe16f",
		LABEL_TEXT_SIZE_SMALL:12,
		LABEL_TEXT_SIZE_MIDDLE:18,
		LABEL_TEXT_SIZE_LARGE:24,
		LABEL_PAUSE_SIZE:30,
		createLevelTextSprite: function(x, y, w, h,text, color,size){
			var spr = document.createElement("div");
			var lineH = size;
			spr.style.position = "absolute";
			spr.style.width = w +"px";
			spr.style.height = h + "px";
			spr.style.left = x + "px";
			spr.style.top = y+ "px";
			spr.style.textAlign="center";
			spr.style.lineHeight= h + "px";
			spr.style.fontFamily="Arial";
			spr.style.fontWeight="bold";
			spr.style.fontSize=lineH+"px";
			//add shadow from up down left and right
			spr.style.textShadow="-1px -1px 1px #ffffff, 1px 1px 1px #ffffff, 1px -1px 1px #ffffff, -1px 1px 1px #ffffff ";
			spr.style.color=color;
			spr.innerHTML=text;
//			spr.style.zIndex = 5;
			return spr;
		},
		createLabelTextSprite_: function(divSprite,text, color,size){
			var spr = divSprite;
			var h = size;
			spr.style.textAlign="center";
			spr.style.lineHeight= spr.style.height;
			spr.style.fontFamily="Arial";
			spr.style.fontWeight="bold";
			spr.style.fontSize=Math.round(h)+"px";
			//add shadow from up down left and right
			spr.style.textShadow="-1px -1px 1px #FFFFFF, 1px 1px 1px #FFFFFF, 1px -1px 1px #FFFFFF, -1px 1px 1px #FFFFFF ";
			spr.style.color=color;
			spr.innerHTML=text;		
		},
		createPauseTextSprite: function(divSprite,text, color,size){
			var spr = divSprite;
			var h = size;
			spr.style.textAlign = "center";
			spr.style.lineHeight = Math.round(spr.style.height*10/36);
			spr.style.fontFamily = "Arial";
			spr.style.fontWeight = "bolder";
			spr.style.textIndent = -20+ "px";
			spr.style.paddingTop = Math.round(spr.style.height*10/36);
			spr.style.fontSize = Math.round(h) + "px";
			// add shadow from up down left and right
			spr.style.textShadow = "-2px -2px 2px #B97F00, 2px 2px 2px #B97F00, 2px -2px 2px #B97F00, -2px 2px 2px #B97F00 ";
			spr.style.color = color;
			spr.innerHTML = text;
		},
		createLabelTextSprite: function(divSprite,text, color,size){
			var spr = divSprite;
			var h = size;
			spr.style.textAlign = "center";
			spr.style.lineHeight = spr.style.height;
			spr.style.fontFamily = "Arial";
			spr.style.fontWeight = "bold";
			spr.style.fontSize = Math.round(h) + "px";
			// add shadow from up down left and right
			spr.style.textShadow = "-2px -2px 2px #B97F00, 2px 2px 2px #B97F00, 2px -2px 2px #B97F00, -2px 2px 2px #B97F00 ";
			spr.style.color = color;
			spr.innerHTML = text;
		},
        createStrDiv : function(rect) {
    		var div = document.createElement("div");
    		div.style.position = "absolute";
    		div.style.width = rect[2] + "px";
    		div.style.height = rect[3] + "px";
    		div.style.left = rect[0] + "px";
    		div.style.top = rect[1] + "px";
    		div.style.color = "#fff";
    		div.style.fontSize = FZ.GameDefs.STATS_FONT_SIZE + "px";
    		div.style.fontFamily = "Arial";
    		div.style.lineHeight  = rect[3] + "px";
    		div.style.textAlign = "left";
    	    this.m_main_div.appendChild(div); 
    	    return div;
    	},
        pause: function(){
            clearTimeout(this.m_timer);
        },
        resume: function(){
            var statename = null;
            
            if (arguments.length > 0) {
                statename = arguments[0];
            }
           
       //     FZ.PrintLog(arguments[0] + " ismainmenu = " + arguments[1]);
            if (null !== this.m_diamondMgr) {
                this.m_time_bar_div.style.display = "inline";
                
                if (FZ.StateDefs.GAME_STATE_OVER == statename) {
                    this.m_time_bar_div.style.width = this.m_time_bar_w + "px";
                    this.m_btn_list[this.BTN_HINT_INDEX].setEnable(true);
                    this.m_diamondMgr.initAllPets(true);
                    this.m_diamondMgr.showPets();
                    this.levelStartTime = (new Date()).getTime();
                    this.levelCurrentTime = this.levelStartTime;
                    this.levelPauseStartTime = this.levelStartTime;
                    this.levelPauseEndTime = this.levelStartTime;
                    this.levelPauseTime = 0;
                    this.curLevelUsedTime = 0;
                    this.m_btn_list[this.BTN_HINT_INDEX].m_div.style.backgroundImage = "url(imgs/" + this.m_btn_list[this.BTN_HINT_INDEX].m_img_list[0] + ")";
                    this.m_game_bg_div = this.m_ui_list[1];
                    
                    this.m_diamondMgr.setHintCount(FZ.GameBase.SaveObject.m_hint);
                    this.m_diamondMgr.setLevel(FZ.GameBase.SaveObject.m_cur_level);

                    var curLevel = this.m_diamondMgr.getLevel();
                    var info = null;
                    info = FZ.getImgInfo("NUM_LEVEL_" + curLevel);
                    this.m_curLevel10_div.style.backgroundImage = "url(imgs/NUM_LEVEL_0.png )";
                    this.m_curLevel_div.style.backgroundImage = "url(imgs/" + info.fileURL + ")";
                    this.m_diamondMgr.setParent(this.m_main_div);
                }
                else 
                    if (FZ.StateDefs.GAME_STATE_NEXT_LEVEL == statename) {
                        this.m_btn_list[this.BTN_HINT_INDEX].m_div.style.backgroundImage = "url(imgs/" + this.m_btn_list[this.BTN_HINT_INDEX].m_img_list[0] + ")";
                        this.m_time_bar_div.style.width = this.m_time_bar_w + "px";
                        this.m_btn_list[this.BTN_HINT_INDEX].setEnable(true);
                        this.m_diamondMgr.initAllPets(true);
                        this.m_diamondMgr.hidePets();
                        this.levelStartTime = (new Date()).getTime();
                        this.levelCurrentTime = this.levelStartTime;
                        this.levelPauseStartTime = this.levelStartTime;
                        this.levelPauseEndTime = this.levelStartTime;
                        this.levelPauseTime = 0;
                        this.curLevelUsedTime = 0;
                        //this.m_hint_num_div[0].style.visibility = "visible";
                        //this.m_hint_num_div[1].style.visibility = "visible";
                        var hint = FZ.GameBase.SaveObject.m_hint;
                        //if (hint >= 10) {
                        //    var num = Math.floor(hint % 10);
                        //    this.m_hint_num_div[0].style.backgroundImage = "url(imgs/number_hint_" + num + ".png )";
                        //    num = Math.floor(hint / 10);
                        //    this.m_hint_num_div[1].style.backgroundImage = "url(imgs/number_hint_" + num + ".png )";
                        //}
                        //else
                        //    if (hint === 0) {
                        //        this.m_hint_num_div[0].style.visibility = "hidden";
                        //        this.m_hint_num_div[1].style.visibility = "hidden";
                        //    }
                        //    else {
                        //        this.m_hint_num_div[1].style.visibility = "hidden";
                        //        this.m_hint_num_div[0].style.backgroundImage = "url(imgs/number_hint_" + hint + ".png )";
                        //    }
                        //  this.m_diamondMgr.setScore(FZ.GameBase.SaveObject.m_total_score);
                        this.m_diamondMgr.setLevel(FZ.GameBase.SaveObject.m_cur_level);
                        this.m_diamondMgr.setHintCount(FZ.GameBase.SaveObject.m_hint);
                        var curLevel = this.m_diamondMgr.getLevel();
                        switch(curLevel){
                        	case 1:
                        	case 2:
                        	case 4:
                        	case 6:
                        	{
                        		this.m_levelStart = true;
                        		this.m_diamondMgr.showPets();
                        		for (var index = 0; index < this.UI_ARROW_KINDS; index++) {
                        			this.m_ui_list[this.UI_ARROW_START_INDEX + index].style.display = "none";
                        		}
                        		this.m_diamondMgr.setParent(this.m_main_div);
                        		break;
                        	}
                        	case 3:
                        	{
                        		this.m_levelStart = false;
                                this.m_diamondMgr.hidePets();
                        		this.m_ui_list[this.UI_ARROW_START_INDEX].style.display = "inline";
                        		break;
                        	}
                        	case 5:
                        	{
                        	this.m_levelStart = false;
                                this.m_diamondMgr.hidePets();
                        		this.m_ui_list[this.UI_ARROW_START_INDEX + 1].style.display = "inline";
                        		break;
                        	}
                        	case 7:
                        	{
                        		this.m_levelStart = false;
                                this.m_diamondMgr.hidePets();
                        		this.m_ui_list[this.UI_ARROW_START_INDEX + 2].style.display = "inline";
                        		break;
                        	}
                        	case 8:
                        	{
                        		this.m_levelStart = false;
                                this.m_diamondMgr.hidePets();
                        		this.m_ui_list[this.UI_ARROW_START_INDEX + 3].style.display = "inline";
                        		break;
                        	}
                        	case 9:
                        	{
                        		this.m_levelStart = false;
                                this.m_diamondMgr.hidePets();
                        		this.m_ui_list[this.UI_ARROW_START_INDEX + 4].style.display = "inline";
                        		break;
                        	}
                        	case 10:
                        	{
                        		this.m_levelStart = false;
                                	this.m_diamondMgr.hidePets();
                        		this.m_ui_list[this.UI_ARROW_START_INDEX + 5].style.display = "inline";
                        		break;
                        	}
                        	default:
            				{
            					break;
            				}
                        }
                        var info = null;
                        info = FZ.getImgInfo("NUM_LEVEL_" + curLevel);
                        if(curLevel === 10){
                        	this.m_curLevel_div.style.backgroundImage = "url(imgs/NUM_LEVEL_0.png)";
                            this.m_curLevel_div.style.display = "inline";
                            this.m_curLevel10_div.style.backgroundImage = "url(imgs/NUM_LEVEL_1.png )";
                            this.m_curLevel10_div.style.display = "inline";
                        }else{
                        	this.m_curLevel_div.style.backgroundImage = "url(imgs/" + info.fileURL + ")";
                        	this.m_curLevel_div.style.display = "inline";
                        	this.m_curLevel10_div.style.backgroundImage = "url(imgs/NUM_LEVEL_0.png)";
                        	this.m_curLevel10_div.style.display = "inline";
                        }
                    }
                    else 
                        if (FZ.StateDefs.GAME_STATE_RESET == statename) {
                            if (arguments.length > 1) {
                                if (arguments[1] === "yes") {
                                    //hintDiv.value = "go to main menu!";
                                    
                                    //                                	this.m_diamondMgr.setHintCount(FZ.GameBase.SaveObject.m_hint);
                                    //                                    this.m_diamondMgr.setScore(FZ.GameBase.SaveObject.m_total_score);
                                    //                                    this.m_diamondMgr.setLevel(FZ.GameBase.SaveObject.m_cur_level);
                                    //  this.m_main_div.style.display = "none";
                                    
                                    this.m_next_state = FZ.StateDefs.GAME_STATE_MAINMEN;
                                    this.m_diamondMgr.saveLevel();
                                    setTimeout(function(){
                                        FZ.GameBase.switchToState(FZ.StateDefs.GAME_STATE_MAINMEN);
                                    }, 100);
                                    
                                    return;
                                }
                                else {
                                    this.levelPauseEndTime = (new Date()).getTime();
                                    this.levelPauseTime += this.levelPauseEndTime - this.levelPauseStartTime;
                                    this.m_diamondMgr.setParent(this.m_main_div);
                                }
                            }
                        }
            }
            this.m_status = FZ.stateStatus.NORMAL;
            this.m_timer = setTimeout(FZ.Tools.bind(this, this.checkOver), 0);
            
        },
        setText: function(div, text){
        	div.innerHTML="" + text;
        }, 
        preProcess: function(preState){
            mySelf = this;
            
            var index = 0;
            var ctx = null;
            var div = null;
            var info = null;
            var cloneInfo = null;
            var infoDown = null;
            //set current level
            var curLevel = FZ.GameBase.SaveObject.m_cur_level;
            var mySelf = this;
            if (curLevel === undefined || 0 === curLevel) { //set ui
                FZ.GameBase.SaveObject.m_cur_level = 1;
                FZ.GameBase.saveGame();
            }
         
            if (!this.m_load_ui) {

                //暂停框
                this.m_pause_div = document.createElement("div");
                this.m_pause_div.style.zIndex = 200;
                info = FZ.getImgInfo("PAUSE_BG");
                FZ.GameBase.setCss(this.m_pause_div, info);
                this.m_main_div.appendChild(this.m_pause_div);
                this.m_pause_div.style.display = "none";
                this.m_pause_div.style.zIndex = 1;
                this.m_pause_div.style.backgroundSize = "100%";

                //无可连接图标时提示框
                this.m_str_nomatch_div = document.createElement("div");
                this.m_str_nomatch_div.style.zIndex = 200;
                info = FZ.getImgInfo("NO_MORE_MATCHS");
                FZ.GameBase.setCss(this.m_str_nomatch_div, info);
                this.m_main_div.appendChild(this.m_str_nomatch_div);
                this.m_str_nomatch_div.style.display = "none";
                this.createLabelTextSprite(this.m_str_nomatch_div,FZ.GameText.TEXT_NO_MORE_MATCHES, this.COLOR_NOMATCH,this.LABEL_TEXT_SIZE_MIDDLE);
                var hintNum = FZ.GameBase.SaveObject.m_hint;

                this.createUIs(this.CUR_UI_DEFS);
                for (var index = 0; index < this.UI_ARROW_KINDS; index++) {
                    this.m_ui_list[this.UI_ARROW_START_INDEX + index].style.display = "none";
                }
                
                if (FZ.TargetMobile !== FZ.TARGET_DEF.ANDRIOD) {
                    this.createBtns(this.CUR_BTN_DEFS, true);
                }
                else {
                    this.createBtns(this.CUR_BTN_ANDROID_DEFS, true);
                }
                info = FZ.getImgInfo(this.CUR_SWITCH_DEFS[0]);
                cloneInfo = FZ.getImgInfo(this.CUR_SWITCH_DEFS[1]);
                this.m_btn_list[this.BTN_PAUSE_INDEX].setSwitchButton(info.fileURL, cloneInfo.fileURL);


                this.m_diamondMgr = new FZ.DiamondManager();
                
                this.m_diamondMgr.m_parent = this.m_main_div;
                this.m_diamondMgr.setBubble(false);
                
                FZ.DivManager.addChild(this.m_main_div);
                this.m_load_ui = true;
            }
            else {
                this.m_diamondMgr.setBubble(false);
                
                this.m_main_div.style.display = "inline";
            }

            this.m_curLevel_div = this.m_ui_list[this.UI_LEVEL_NUM_INDEX];
            this.m_curLevel10_div = this.m_ui_list[this.UI_LEVEL_TEN_INDEX];
            this.m_time_bar_div = this.m_ui_list[this.UI_TIME_BAR_INDEX];
            info = FZ.getImgInfo(this.CUR_UI_DEFS[this.UI_TIME_BAR_INDEX]);
            this.m_time_bar_w = info.w;
            this.m_time_bar_div.style.width = this.m_time_bar_w + "px";
            this.m_diamondMgr.setObserver(this);
            
            if ((FZ.StateDefs.GAME_STATE_MAINMEN === preState) ||
            		(FZ.StateDefs.GAME_STATE_OVER === preState) ||
            (FZ.StateDefs.GAME_STATE_HELP === preState)) {
                if (FZ.GameBase.SaveObject.m_gamein === true) {
                    this.m_diamondMgr.resumeLevel();
                    var hint = FZ.GameBase.SaveObject.m_cur_hintCount;
                }
                else {
                    this.m_diamondMgr.initAllPets(true);
                    var hint = FZ.GameBase.SaveObject.m_hint;
                    
                }
                //设置提示
                this.m_btn_list[this.BTN_HINT_INDEX].m_div.style.backgroundImage = "url(imgs/BTN_HINT.png )";

                this.m_diamondMgr.hidePets();
            }

           
            if (FZ.GameBase.SaveObject.m_gamein === true) {
                this.m_levelStart = true;
                this.curLevelUsedTime = FZ.GameBase.SaveObject.m_level_usedTime;
                this.m_diamondMgr.showPets();
                for (var index = 0; index < this.UI_ARROW_KINDS; index++) {
                    this.m_ui_list[this.UI_ARROW_START_INDEX + index].style.display = "none";
                }
                this.m_diamondMgr.setParent(this.m_main_div);
            }
            else {
                this.curLevelUsedTime = 0;
                this.m_diamondMgr.setLevel(FZ.GameBase.SaveObject.m_cur_level);
                curLevel = this.m_diamondMgr.getLevel();
                switch(curLevel){
            	case 1:
            	case 2:
            	case 4:
            	case 6:
            	{
            		this.m_levelStart = true;
            		this.m_diamondMgr.showPets();
            		for (var index = 0; index < this.UI_ARROW_KINDS; index++) {
            			this.m_ui_list[this.UI_ARROW_START_INDEX + index].style.display = "none";
            		}
            		this.m_diamondMgr.setParent(this.m_main_div);
            		break;
            	}
            	case 3:
            	{
            		this.m_levelStart = false;
                    this.m_diamondMgr.hidePets();
            		this.m_ui_list[this.UI_ARROW_START_INDEX].style.display = "inline";
            		break;
            	}
            	case 5:
            	{
            		this.m_levelStart = false;
                    this.m_diamondMgr.hidePets();
            		this.m_ui_list[this.UI_ARROW_START_INDEX + 1].style.display = "inline";
            		break;
            	}
            	case 7:
            	{
            		this.m_levelStart = false;
                    this.m_diamondMgr.hidePets();
            		this.m_ui_list[this.UI_ARROW_START_INDEX + 2].style.display = "inline";
            		break;
            	}
            	case 8:
            	{
            		this.m_levelStart = false;
                    this.m_diamondMgr.hidePets();
            		this.m_ui_list[this.UI_ARROW_START_INDEX + 3].style.display = "inline";
            		break;
            	}
            	case 9:
            	{
            		this.m_levelStart = false;
                    this.m_diamondMgr.hidePets();
            		this.m_ui_list[this.UI_ARROW_START_INDEX + 4].style.display = "inline";
            		break;
            	}
            	case 10:
            	{
            		this.m_levelStart = false;
                    this.m_diamondMgr.hidePets();
            		this.m_ui_list[this.UI_ARROW_START_INDEX + 5].style.display = "inline";
            		break;
            	}
            	default:
				{
					break;
				}
            }
                
            }
            this.levelStartTime = (new Date()).getTime();
            this.levelCurrentTime = this.levelStartTime;
            this.levelPauseStartTime = this.levelStartTime;
            this.levelPauseEndTime = this.levelStartTime;
            this.levelPauseTime = 0;
//            this.m_str_nomatch_div.style.display = "inline";
            
            this.resetTranslate(0);
           /* if (FZ.TargetMobile !== FZ.TARGET_DEF.ANDRIOD) {
                this.m_sound = FZ.GameBase.SaveObject.m_sound;
                if (this.m_sound === true) {
                	this.m_btn_list[this.BTN_SOUND_INDEX].setSwitchState(this.m_btn_list[this.BTN_SOUND_INDEX].SWITCH_ON);
               //     FZ.Music.play(FZ.ResourceManager.ResourceLib.BGMusic.Resource, true);
                }
                else {
                	this.m_btn_list[this.BTN_SOUND_INDEX].setSwitchState(this.m_btn_list[this.BTN_SOUND_INDEX].SWITCH_OFF);
               //     FZ.Music.stop();
                }
            }*/
            //this.m_btn_list[this.BTN_HOME_INDEX].m_div.style.display = "none";
            this.m_diamondMgr.setBonusTime(0);
            if (isDebug) {
                document.addEventListener("keyup", FZ.Tools.bindWithEvent(this, this.debugLevel), false);
            }
            setTimeout(function(){
                mySelf.fade_in.call(mySelf, 2000, 1);
            }, 10);
            this.m_timer = setTimeout(FZ.Tools.bind(this, this.checkOver), 0);
            
            this.m_call_time = FZ.Tools.bind(this, this.checkOver);
            
        },
        
        postProcess: function(){
            //			var hintDiv = document.getElementById("strHint");
            this.m_diamondMgr.removeEvent();
            if (this.m_next_state === FZ.StateDefs.GAME_STATE_OVER ||
            	this.m_next_state === FZ.StateDefs.GAME_STATE_RESET ||
            	this.m_next_state === FZ.StateDefs.GAME_STATE_NEXT_LEVEL ||
            	this.m_next_state === FZ.StateDefs.GAME_STATE_GAME_WIN) {
                this.m_main_div.style.display = "inline";
                //				hintDiv.value = "show game in next = " + this.m_next_state;
            }
            else {
                this.m_main_div.style.display = "none";
                //				hintDiv.value = "exit game in";
                this.fade_out(2000, 0, 0);
            }
            
        },
        
        mouseHandler: function(evt){
            //evt.preventDefault();
            FZ.EventRemove(this, this.m_main_div, FZ.EVENT_DEF.T_START, this.m_call_tStart);
            FZ.EventRemove(this, this.m_main_div, FZ.EVENT_DEF.M_CLICK, this.m_call_mClick);
            
            this.m_levelStart = true;
            this.m_diamondMgr.showPets();
            for (var index = 0; index < this.UI_ARROW_KINDS; index++) {
                this.m_ui_list[this.UI_ARROW_START_INDEX + index].style.display = "none";
            }
            this.levelStartTime = (new Date()).getTime();
            this.levelCurrentTime = this.levelStartTime;
            this.levelPauseStartTime = this.levelStartTime;
            this.levelPauseEndTime = this.levelStartTime;
            this.levelPauseTime = 0;
            this.m_levelLeftTime = 0;
            this.m_diamondMgr.setParent(this.m_main_div);
        },
        checkOver: function(){
            var mySelf = this;
            //clearTimeout(this.m_timer);
            ////////////////////
            if (undefined === FZ.GameBase.CurrentState) {
                return;
            }
            if (FZ.StateDefs.GAME_STATE_GAME_IN !== FZ.GameBase.CurrentState.StateName) {
                clearTimeout(this.m_timer);
                return;
            }
            var index = 0;
            var level = this.m_diamondMgr.getLevel();
            if (!this.m_levelStart) {
                var time = Math.floor((new Date()).getTime() - this.levelCurrentTime) / 1000;
                var isTouched = false;
               //   this.m_ui_list[this.UI_ARROW_START_INDEX + level - 3].style.display = "inline";
                var scoreNum = FZ.AG.SearchSpecialPath.setScoreNum(FZ.GameBase.SaveObject.score + this.m_diamondMgr.getScore());
                for(var index = 0; index < scoreNum.length; index++){
                	this.m_ui_list[this.UI_SCORE_START_INDEX + 5 - scoreNum.length + index].style.backgroundImage = "url(imgs/NUM_LEVEL_" + scoreNum[scoreNum.length - 1- index] + ".png)";
                }
                if(scoreNum.length < 5){
                	for(var index = 0; index < 5 - scoreNum.length ; index++){
                		this.m_ui_list[this.UI_SCORE_START_INDEX + index].style.backgroundImage = "url(imgs/NUM_LEVEL_0.png)";
                	}
                }
                switch(level){
            	case 3:
            	{
            		this.m_levelStart = false;
                    this.m_diamondMgr.hidePets();
            		this.m_ui_list[this.UI_ARROW_START_INDEX].style.display = "inline";
            		break;
            	}
            	case 5:
            	{
            		this.m_levelStart = false;
                    this.m_diamondMgr.hidePets();
            		this.m_ui_list[this.UI_ARROW_START_INDEX + 1].style.display = "inline";
            		break;
            	}
            	case 7:
            	{
            		this.m_levelStart = false;
                    this.m_diamondMgr.hidePets();
            		this.m_ui_list[this.UI_ARROW_START_INDEX + 2].style.display = "inline";
            		break;
            	}
            	case 8:
            	{
            		this.m_levelStart = false;
                    this.m_diamondMgr.hidePets();
            		this.m_ui_list[this.UI_ARROW_START_INDEX + 3].style.display = "inline";
            		break;
            	}
            	case 9:
            	{
            		this.m_levelStart = false;
                    this.m_diamondMgr.hidePets();
            		this.m_ui_list[this.UI_ARROW_START_INDEX + 4].style.display = "inline";
            		break;
            	}
            	case 10:
            	{
            		this.m_levelStart = false;
                    this.m_diamondMgr.hidePets();
            		this.m_ui_list[this.UI_ARROW_START_INDEX + 5].style.display = "inline";
            		break;
            	}
            	default:
				{
					break;
				}
            }

                if (FZ.TARGET_DEF.MOBILE === FZ.TargetPort) {
                    if (null === this.m_call_tStart) {
                        FZ.EventHandler(this, this.m_main_div, FZ.EVENT_DEF.T_START, this.mouseHandler);
                    }
                }
                else {
                    if (null === this.m_call_mClick) {
                        FZ.EventHandler(this, this.m_main_div, FZ.EVENT_DEF.M_CLICK, this.mouseHandler);
                    }
                }
                if (time > 3) {
                    this.m_levelStart = true;
                    this.m_diamondMgr.showPets();
                    for (var index = 0; index < this.UI_ARROW_KINDS; index++) {
                        this.m_ui_list[this.UI_ARROW_START_INDEX + index].style.display = "none";
                    }
                    this.levelStartTime = (new Date()).getTime();
                    this.levelCurrentTime = this.levelStartTime;
                    this.levelPauseStartTime = this.levelStartTime;
                    this.levelPauseEndTime = this.levelStartTime;
                    this.levelPauseTime = 0;
                    this.m_levelLeftTime = 0;
                    this.m_diamondMgr.setParent(this.m_main_div);
                }
                this.m_timer = setTimeout(mySelf.m_call_time, 200);
                this.m_diamondMgr.setBubble(true);
                return;
            }
            if (this.m_isNoMatch === true) {
                this.m_str_nomatch_div.style.display = "inline";
                var curTime = (new Date()).getTime();
                if (Math.floor(curTime - this.levelCurrentTime)/1000 > 2) {
                    this.m_diamondMgr.ResetPosition();
                    if (!this.m_diamondMgr.searchHasMatch()) {
                        this.m_diamondMgr.ResetTwoPosition();
                    }
                    this.m_isNoMatch = false;
                    this.levelPauseTime += 3200;
                    this.m_str_nomatch_div.style.display = "none";
                }
                this.m_timer = setTimeout(mySelf.m_call_time, 200);
                return;
            }
            
            if (this.m_gamePause || this.pageHiddin) {
            	this.m_timer = setTimeout(FZ.Tools.bind(this, this.checkOver), 100);
                return;
            }
            if(this.m_showPage === true && FZ.TargetMobile !== FZ.TARGET_DEF.ANDRIOD){
            	this.m_showPage = false;
            	this.levelPauseEndTime = (new Date()).getTime();
            	this.levelPauseTime += this.levelPauseEndTime - this.levelPauseStartTime;
            }	
            level = FZ.GameBase.SaveObject.m_cur_level;
			
            var time = Math.floor(((new Date()).getTime() - this.levelPauseTime - this.levelStartTime) / 1000 + this.curLevelUsedTime);
            var perSecLen = (this.m_time_bar_w / FZ.GameDefs.LEVEL_TIME[FZ.GameBase.SaveObject.m_cur_level]);
            
            time -= this.m_diamondMgr.getBonusTime(); 
            if (time >= FZ.GameDefs.LEVEL_TIME[FZ.GameBase.SaveObject.m_cur_level]) {
                time = FZ.GameDefs.LEVEL_TIME[FZ.GameBase.SaveObject.m_cur_level];
            }else if(time < 0){
            	time = 0;
           } 
            var showW = (FZ.GameDefs.LEVEL_TIME[level] - time) * perSecLen;
            
            this.m_time_bar_div.style.width = showW + "px";
            
             var scoreNum = FZ.AG.SearchSpecialPath.setScoreNum(FZ.GameBase.SaveObject.score + this.m_diamondMgr.getScore());
            for(var index = scoreNum.length - 1; index >= 0 ; index--){
            	this.m_ui_list[this.UI_SCORE_START_INDEX + 5 - scoreNum.length + index].style.backgroundImage = "url(imgs/NUM_LEVEL_" + scoreNum[scoreNum.length - 1- index] + ".png)";
            	}
            if(scoreNum.length < 5){
            	for(var index = 0; index < 5 - scoreNum.length ; index++){
            		this.m_ui_list[this.UI_SCORE_START_INDEX + index].style.backgroundImage = "url(imgs/NUM_LEVEL_0.png)";
            	}
            }
            this.m_level_usedTime = time;
            if ((FZ.GameDefs.LEVEL_TIME[level] <= time)) {
                //game over.
                document.getElementById("mainDiv").style.backgroundColor="#a64401";
                var href = document.getElementById("href");
                href.style.display="none";
                this.m_timer = setTimeout(FZ.Tools.bind(this, this.setGameOver),0);
                this.m_diamondMgr.setBubble(true);
                FZ.GameBase.switchToState(FZ.StateDefs.GAME_STATE_OVER);
                return;
            }
            else {
            	this.m_timer = setTimeout(mySelf.m_call_time, 1500);
            	this.m_diamondMgr.saveLevel();
            }
        },
        checkWin: function(){
            var level = this.m_diamondMgr.getLevel();
			myPlayLevel = level;
            var time = (((new Date()).getTime() - this.levelPauseTime - this.levelStartTime) / 1000 + this.curLevelUsedTime);
            if (this.m_diamondMgr.getLeftPet() === 0) {
                //into next level
                var score = FZ.GameBase.SaveObject.score;
                var timeBonus = (FZ.GameDefs.LEVEL_TIME[level] - this.m_level_usedTime) * 30;
                var levelscore = this.m_diamondMgr.getScore() + timeBonus ;
                var totalUsedTime = FZ.GameBase.SaveObject.m_usedTime + this.m_level_usedTime;
                var levelUsedHint = FZ.GameBase.SaveObject.m_hint - this.m_diamondMgr.getHintCount();
                FZ.GameBase.SaveObject.m_usedTime = totalUsedTime;
                var totalUsedHint = FZ.GameBase.SaveObject.m_totalUsedHint + levelUsedHint;
                FZ.GameBase.SaveObject.m_totalUsedHint = totalUsedHint;
                var scoreNum = FZ.AG.SearchSpecialPath.setScoreNum(FZ.GameBase.SaveObject.score + levelscore);
				myPlayLevelScore = FZ.GameBase.SaveObject.score + levelscore;
                for(var index = scoreNum.length - 1; index >= 0 ; index--){
                	this.m_ui_list[this.UI_SCORE_START_INDEX + 5 - scoreNum.length + index].style.backgroundImage = "url(imgs/NUM_LEVEL_" + scoreNum[scoreNum.length - 1- index] + ".png)";
                }
                if(scoreNum.length < 5){
                	for(var index = 0; index < 5 - scoreNum.length ; index++){
                		this.m_ui_list[this.UI_SCORE_START_INDEX + index].style.backgroundImage = "url(imgs/NUM_LEVEL_0.png)";
                	}
                }
                if (level === FZ.GameDefs.MAX_LEVEL_RANK) {
                    var audio = document.getElementById("music");
                    audio.currentTime = 0;
                    audio.pause();
                    this.m_btn_list[this.BTN_HINT_INDEX].m_div.style.backgroundImage = "url(imgs/BTN_HINT.png )";
                    this.MUSIC_Play = false;
                    clearTimeout(this.m_timer);
                    this.m_diamondMgr.setBubble(false);
                    this.m_next_state = FZ.StateDefs.GAME_STATE_GAME_WIN;
                    this.pause();
                    FZ.GameBase.SaveObject.score += levelscore;
                    FZ.GameBase.SaveObject.m_hint = this.m_diamondMgr.getHintCount();// + FZ.GameDefs.LEVEL_HINT_NUMBER[level];
                    //请求后台
                    var ajax = new XMLHttpRequest();
                    ajax.onreadystatechange=function()
                    {
                        if (ajax.readyState==4 && ajax.status==200)
                        {   var success = false;
                            try{
                                if(JSON.parse(ajax.responseText).data.isrank === true){
                                    success = true;
                                }
                            }catch(error){
                                console.log("错误信息：" + error);
                            }finally {
                                setTimeout(function(){
                                    FZ.Game.GameState.waiting(false);
                                    FZ.GameBase.switchToState(FZ.StateDefs.GAME_STATE_GAME_WIN, levelscore + score, totalUsedTime, totalUsedHint,success);
                                    FZ.GameBase.SaveObject.pass = true;
                                    FZ.GameBase.saveGame();
                                },1500);
                            }
                        }else if(ajax.readyState==4 && ajax.status==404){
                            setTimeout(function(){
                                FZ.Game.GameState.waiting(false);
                                FZ.GameBase.switchToState(FZ.StateDefs.GAME_STATE_GAME_WIN, levelscore + score, totalUsedTime, totalUsedHint,false);
                                FZ.GameBase.SaveObject.pass = true;
                                FZ.GameBase.saveGame();
                            },1500);
                        }
                    }
                    ajax.open("GET","/index.php?con=Game&act=end&finish=true",true);
                    ajax.send();
                    this.waiting(true);
                    return;
                }
                else {
                    clearTimeout(this.m_timer);
                    this.m_diamondMgr.setBubble(false);
                    this.m_next_state = FZ.StateDefs.GAME_STATE_NEXT_LEVEL;
                    this.pause();
                    FZ.GameBase.pushState(this.StateName);
                    FZ.GameBase.switchToState(FZ.StateDefs.GAME_STATE_NEXT_LEVEL, levelscore, timeBonus,levelUsedHint);
                    FZ.GameBase.SaveObject.score += levelscore;
                    FZ.GameBase.SaveObject.m_cur_level = level + 1;
                    if(levelUsedHint < FZ.GameDefs.LEVEL_HINT_NUMBER[level]){
                    	FZ.GameBase.SaveObject.m_hint = 1 + FZ.GameDefs.LEVEL_HINT_NUMBER[level+1];
                    }else{
                    	FZ.GameBase.SaveObject.m_hint = FZ.GameDefs.LEVEL_HINT_NUMBER[level+1];
                    }
                    
                    FZ.GameBase.saveGame();
                    return;
                }
                
            }
           
        },
        waiting:function(flag){
            if(flag){
                document.getElementById("shadow").style.display = "block";
                document.getElementById("waiting").style.display = "block";
            }else{
                document.getElementById("shadow").style.display = "none";
                document.getElementById("waiting").style.display = "none";
            }

        },
        checkNoMatch: function(){
            if (!this.m_diamondMgr.searchHasMatch()) {
                this.m_isNoMatch = true;
            }
            if (this.m_isNoMatch) {
                this.levelCurrentTime = (new Date()).getTime();
                
            }
        },
        setGameOver: function(){
            var audio = document.getElementById("music");
            audio.currentTime = 0;
            audio.pause();
            this.MUSIC_Play = false;
            clearTimeout(this.m_timer);
            this.m_next_state = FZ.StateDefs.GAME_STATE_OVER;
            this.pause();
            var levelscore = this.m_diamondMgr.getScore();
        	var score = FZ.GameBase.SaveObject.score;
		    var t_score = score + levelscore;
            FZ.GameBase.pushState(this.StateName);
            FZ.GameBase.SaveObject.m_gamein = false;
            FZ.GameBase.SaveObject.m_level_usedTime = 0;
            FZ.GameBase.SaveObject.m_usedTime = 0;
		    Gamehub.Score.submit(t_score);
		
        },
        
        setNextLevel: function(levelscore, totalscore){
            clearTimeout(this.m_timer);
            this.m_diamondMgr.setBubble(false);
            this.m_next_state = FZ.StateDefs.GAME_STATE_NEXT_LEVEL;
            this.pause();
            FZ.GameBase.pushState(this.StateName);
            FZ.GameBase.switchToState(FZ.StateDefs.GAME_STATE_NEXT_LEVEL, levelscore, totalscore);
            
        },
        setGameWin: function(levelscore, totalscore){
            clearTimeout(this.m_timer);
            this.m_diamondMgr.setBubble(false);
            this.m_next_state = FZ.StateDefs.GAME_STATE_GAME_WIN;
            this.pause();
            FZ.GameBase.pushState(this.StateName);
            FZ.GameBase.switchToState(FZ.StateDefs.GAME_STATE_GAME_WIN, levelscore, totalscore);
            
        },
        
        buttonClick: function(btn){
            if (undefined === FZ.GameBase.CurrentState) {
                return;
            }
            if (FZ.StateDefs.GAME_STATE_GAME_IN !== FZ.GameBase.CurrentState.StateName) {
                return;
            }
            if (this.m_isNoMatch === true) {
                return;
            }
            var music = document.getElementById("music");
            if (this.m_btn_list[this.BTN_HINT_INDEX] === btn) {
                this.m_diamondMgr.setBubble(false);
                if (this.m_gamePause) {
                    return;
                }
                if (!music.paused) {
                    music.pause();
                    this.MUSIC_Play = false;
                    btn.m_div.style.backgroundImage = "url(imgs/BTN_HINT.png )";
                }else{
                    music.play();
                    this.MUSIC_Play = true;
                    btn.m_div.style.backgroundImage = "url(imgs/BTN_HINT_GREY.png )";
                }
            }
            else if (this.m_btn_list[this.BTN_PAUSE_INDEX] === btn || btn.m_div.id == "return") {
                        this.m_gamePause = !this.m_gamePause;
                        if (this.m_gamePause === true) {
                            if (!music.paused) {
                                this.MUSIC_Play = true;
                                music.pause();
                                this.m_btn_list[this.BTN_HINT_INDEX].m_div.style.backgroundImage = "url(imgs/BTN_HINT.png )";
                            }
                            FZ.GameBase.pushState("gamein");
                            this.levelPauseStartTime = (new Date()).getTime();
                            this.m_pause_div.style.display = "inline";
                            this.m_pause_div.style.backgroundImage = "url(imgs/PAUSE_BG.png)";
                            btn.setSwitchState(btn.SWITCH_OFF);
                            this.m_diamondMgr.m_reset_finished = false;
                            this.m_diamondMgr.setBubble(false);
                            this.m_diamondMgr.hidePets();
                            document.getElementById("return").style.zIndex = 1;
                            document.getElementById("restart").style.zIndex = 1;
                            FZ.Game.GameState.m_btn_list[FZ.Game.GameState.BTN_PAUSE_INDEX].m_div.style.backgroundImage = "url(imgs/BTN_GAME_BACK.png)";
                        }
                        else {
                            if (this.MUSIC_Play) {
                                music.play();
                                this.m_btn_list[this.BTN_HINT_INDEX].m_div.style.backgroundImage = "url(imgs/BTN_HINT_GREY.png )";
                            }
                            document.getElementById("return").style.zIndex = -1;
                            document.getElementById("restart").style.zIndex = -1;
                            this.m_diamondMgr.showPets();
                            this.m_pause_div.style.display = "none";
                            this.m_diamondMgr.m_reset_finished = true;
                            FZ.Game.GameState.m_btn_list[FZ.Game.GameState.BTN_PAUSE_INDEX].m_div.style.backgroundImage = "url(imgs/BTN_PAUSE.png)";

                            this.levelPauseEndTime = (new Date()).getTime();
                            this.levelPauseTime += this.levelPauseEndTime - this.levelPauseStartTime;
                        }
                        this.m_diamondMgr.saveLevel();
                    }
            else if(btn.m_div.id == "restart"){
                this.MUSIC_Play = false;
                music.currentTime = 0;
                music.pause();
                this.levelCurrentTime = this.levelStartTime = (new Date()).getTime();
                this.levelPauseStartTime = this.levelStartTime;
                this.levelPauseEndTime = this.levelStartTime;
                this.m_level_usedTime = 0;
                this.levelPauseTime = 0;
                this.curLevelUsedTime = 0;
                this.buttonClick(this.m_btn_list[FZ.Game.GameState.BTN_PAUSE_INDEX]);
                document.getElementById("return").style.zIndex = -1;
                document.getElementById("restart").style.zIndex = -1;
                FZ.GameBase.popState("gameover");
                FZ.GameBase.switchToState(FZ.StateDefs.GAME_STATE_GAME_IN);
            }
        },
        
        debugLevel: function(){
            var level = this.m_diamondMgr.getLevel();
            var levelscore = this.m_diamondMgr.getScore() + this.m_levelLeftTime * 20;
            
            if (level < 9) {
                FZ.GameBase.SaveObject.m_cur_level = level + 1;
            }
            
            if (level === 9) {
                clearTimeout(this.m_timer);
                this.m_diamondMgr.setBubble(false);
                this.m_next_state = FZ.StateDefs.GAME_STATE_GAME_WIN;
                this.pause();
                FZ.GameBase.pushState(this.StateName);
                FZ.GameBase.switchToState(FZ.StateDefs.GAME_STATE_GAME_WIN, this.m_levelLeftTime, levelscore);
                return;
            }
            else {
                clearTimeout(this.m_timer);
                this.m_diamondMgr.setBubble(false);
                this.m_next_state = FZ.StateDefs.GAME_STATE_NEXT_LEVEL;
                this.pause();
                FZ.GameBase.pushState(this.Game.GameOverState);
                FZ.GameBase.switchToState(FZ.StateDefs.GAME_STATE_NEXT_LEVEL, this.m_levelLeftTime, levelscore);
                return;
            }
        },
        pageHide: function(e){
            if (FZ.Game.GameState.m_diamondMgr === null) {
                return;
            }
            FZ.Game.GameState.m_diamondMgr.m_reset_finished = false;
            FZ.Game.GameState.m_diamondMgr.setBubble(false);
            FZ.Game.GameState.levelPauseStartTime = (new Date()).getTime();
            FZ.Game.GameState.pageHiddin = true;
        },
        pageShow: function(e){
            FZ.Game.GameState.m_showPage = true;
            if (FZ.Game.GameState.m_diamondMgr === null) {
                return;
            }
            FZ.Game.GameState.m_diamondMgr.m_reset_finished = true;
            FZ.Game.GameState.pageHiddin = false;

        }
        
    }, FZ.BaseState))();
    if (FZ.TargetMobile !== FZ.TARGET_DEF.ANDRIOD) {
    	window.addEventListener("pagehide", FZ.Game.GameState.pageHide, false);
    	window.addEventListener("pageshow", FZ.Game.GameState.pageShow, false);
    }
})();