FZ.Game.MainmenuState = new (FZ
		.newClass(
				{
					StateName : FZ.StateDefs.GAME_STATE_MAINMEN,

					CUR_UI_DEFS : [ "majong_BG", "MAIN_MENU_BG"],
					BTN_PLAY_INDEX : 0,
					CUR_BTN_ANDROID_DEFS : [ ["BTN_START", "BTN_START"]],
					CUR_BTN_DEFS : [ [ "BTN_START", "BTN_START" ]/*,[ "BTN_MENU_SOUND", "BTN_MENU_SOUND_TOUCH" ] */],

					BTN_NEW_GAME_INDEX : 0,

					
					m_load_ui : false,
					m_next_state: "",
					COLOR_YELLOW:"#F0D751",
					COLOR_BROWN:"#B97F00",
					COLOR_ORANGE:"#FFC72A",
					LABEL_TEXT_SIZE_SMALL:12,
					LABEL_TEXT_SIZE_MIDDLE:18,
					LABEL_TEXT_SIZE_LARGE:24,
					createBtnTextSprite: function(divSprite, text, color){
						var spr = divSprite;
						var h = spr.m_h;
						spr.m_div.style.textAlign="center";
						spr.m_div.style.lineHeight= spr.m_div.style.height;
						spr.m_div.style.fontFamily="Arial";
						spr.m_div.style.fontWeight="bold";
						spr.m_div.style.fontSize=Math.round(h/4)+"px";

						spr.m_div.style.textShadow="-2px -2px 2px #7D2D1B, 2px 2px 2px #7D2D1B, 2px -2px 2px #7D2D1B, -2px 2px 2px #7D2D1B ";
						spr.m_div.style.color=color;
						spr.m_div.innerHTML=text;
						return spr;
			    	},
					preProcess : function() {
						var index = 0;
						var btn = null;
						var info = null;
						var infoDown = null;
						var ctx = null;
						var mySelf = this;
						if (!this.m_load_ui) {

							this.createUIs(this.CUR_UI_DEFS);
							if (FZ.TargetMobile !== FZ.TARGET_DEF.ANDRIOD) {
								this.createBtns(this.CUR_BTN_DEFS, true);
							} else {
								this.createBtns(this.CUR_BTN_ANDROID_DEFS,
												true);
							}
							FZ.DivManager.addChild(this.m_main_div);
							if (FZ.TargetMobile !== FZ.TARGET_DEF.ANDRIOD) {
								this.m_sound = FZ.GameBase.SaveObject.m_sound;
							}
							this.m_load_ui = true;
						}
						if (FZ.GameBase.SaveObject.m_cur_level === 0) {
							this.m_btn_list[this.BTN_PLAY_INDEX].setEnable(true);
							this.m_btn_list[this.BTN_PLAY_INDEX].m_div.style.display = "inline";
							this.createBtnTextSprite(this.m_btn_list[this.BTN_PLAY_INDEX], FZ.GameText.TEXT_START_GAME, this.COLOR_ORANGE);
						}else if (FZ.GameBase.SaveObject.pass) {
							this.m_btn_list[this.BTN_PLAY_INDEX].setEnable(true);
							this.m_btn_list[this.BTN_PLAY_INDEX].m_div.style.display = "inline";
							this.createBtnTextSprite(this.m_btn_list[this.BTN_PLAY_INDEX], FZ.GameText.TEXT_START_GAME, this.COLOR_ORANGE);
							FZ.GameBase.SaveObject.m_cur_level = 0;
							FZ.GameBase.SaveObject.pass = false;
							FZ.GameBase.SaveObject.score = 0;
							FZ.GameBase.SaveObject.m_hint = FZ.GameDefs.LEVEL_HINT_NUMBER[1];
							FZ.GameBase.SaveObject.m_totalUsedHint = 0;
							FZ.GameBase.SaveObject.m_gamein = false;
							FZ.GameBase.saveGame();		
						}else{
							this.m_btn_list[this.BTN_PLAY_INDEX].setEnable(true);
							this.m_btn_list[this.BTN_PLAY_INDEX].m_div.style.display = "inline";
							this.createBtnTextSprite(this.m_btn_list[this.BTN_PLAY_INDEX], FZ.GameText.TEXT_START_GAME, this.COLOR_ORANGE);
						}
						
						this.m_main_div.style.display = "inline";
						this.resetTranslate(0.5);
						setTimeout(function() {
							mySelf.fade_in.call(mySelf, 2000, 1);
						}, 10);

					},

					postProcess : function() {
						// this.m_main_div.style.display = "none";
						if (this.m_next_state !== FZ.StateDefs.GAME_STATE_GAME_CLEAR){
							this.fade_out(2000, 0, 0);
						}
						
					},
					pause: function(){
			            clearTimeout(this.m_timer);
			        },
					resume: function(){
						if (arguments.length > 0) {
			                statename = arguments[0];
			            }
						if (arguments.length > 1) {
                            if (arguments[1] === "yes") {
                                FZ.GameBase.SaveObject.m_cur_level = 0;
								FZ.GameBase.SaveObject.pass = false;
								FZ.GameBase.SaveObject.score = 0;
								FZ.GameBase.SaveObject.m_hint = FZ.GameDefs.LEVEL_HINT_NUMBER[1];
								FZ.GameBase.SaveObject.m_totalUsedHint = 0;
								FZ.GameBase.SaveObject.m_gamein = false;
								FZ.GameBase.saveGame();	
								FZ.GameBase.switchToState(FZ.StateDefs.GAME_STATE_GAME_IN);
                                return;
                            }
                            else {
                            	this.m_next_state = FZ.StateDefs.GAME_STATE_MAINMEN;
                            }
                            
                        }
					},
					buttonClick : function(btn) {
						if (this.m_btn_list[this.BTN_PLAY_INDEX] === btn) {
							FZ.GameBase.switchToState(FZ.StateDefs.GAME_STATE_GAME_IN);
							document.getElementById("mainDiv").style.backgroundColor="#0697ea";
							document.body.style.overflow="scroll";
						}
					}

				}, FZ.BaseState))();