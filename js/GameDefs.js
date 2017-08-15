
(function(){
    var clientWidth = document.documentElement.clientWidth;
    var clientHeight = document.documentElement.clientHeight<515?515:document.documentElement.clientHeight;
    var OFFSET_X,OFFSET_Y;
    if(clientWidth < 360){
        OFFSET_X= 10;
        OFFSET_Y=110;
    }else if(clientWidth < 375){
        OFFSET_X= 30;
        OFFSET_Y=130;
    }else if(clientWidth < 414){
        OFFSET_X = 40;
        OFFSET_Y = 140;
    }else{
        OFFSET_X= 60;
        OFFSET_Y=160;
    }
    FZ.GameDefs = {
    	STATS_FONT_SIZE : 16,
        // screen define
        SCREEN_W: clientWidth,
        SCREEN_H: clientHeight,
		SCREEN_BOTTOM_H : 44,
		SCREEN_TOP_H : 20,
        // gravity define
        TIME_RATE: 8,
        HALF_ACCELERATION_OF_GRAVITY: 5,
        FLASH_COUNT : 0,
		FLASH_FOCUS_COUNT : 1,
        // the speed of diamond
        DIAMOND_SPEED_X: 6,
        DIAMOND_SPEED_Y: 6,
        FALLING_SPEED_X: 4,
        FALLING_SPEED_Y: -4,
        
        //rorate
        DIAMOND_RORATE_NONE: 0,
        DIAMOND_RORATE_LEFT: 1,
        DIAMOND_RORATE_RIGHT: 2,
        
        DIAMOND_RORATE_RATE: 20,
        
        // game state
        GAME_STATE_UNKNOW: -1,
        GAME_STATE_LOADING: 0,
        GAME_STATE_INIT: 1,
        GAME_STATE_GAME: 2,
        
        PET_FLICKER_TIME : 100,
        PET_FLICKER_FOCUS_TIME : 50,
        PET_TYPE_0: 0,
        PET_TYPE_1: 1,
        PET_TYPE_2: 2,
        PET_TYPE_3: 3,
        PET_TYPE_4: 4,
        PET_TYPE_5: 5,
        PET_TYPE_6: 6,
        PET_TYPE_7: 7,
        PET_TYPE_8: 8,
        PET_TYPE_9: 9,
        PET_TYPE_10: 10,
        PET_TYPE_11: 11,
        PET_TYPE_12: 12,
        PET_TYPE_13: 13,
        PET_TYPE_14: 14,
        PET_TYPE_15: 15,
        PET_TYPE_16: 16,
        PET_TYPE_17: 17,
        PET_TYPE_18: 18,
        PET_TYPE_19: 19,
        PET_TYPE_20: 20,
        PET_TYPE_21: 21,
        PET_TYPE_22: 22,
        PET_TYPE_23: 23,
        PET_TYPE_24: 24,
        PET_TYPE_25: 25,
        PET_TYPE_26: 26,
        PET_TYPE_27: 27,
        PET_TYPE_28: 28,
        PET_TYPE_29: 29,
        PET_TYPE_30: 30,
        PET_TYPE_31: 31,
        PET_TYPE_32: 32,
        PET_TYPE_33: 33,
        PET_TYPE_34: 34,
        PET_TYPE_35: 35,
        PET_TYPE_36: 36,
        PET_TYPE_37: 37,
        PET_TYPE_38: 38,
        PET_TYPE_39: 39,
        
        DIAMOND_TYPES: 32,
        
      
		DREAMPET_NUM_LINE_HALF : 4,
		DREAMPET_NUM_COL_HALF : 3,
		DREAMPET_NUM_COL : 6,
		DREAMPET_NUM_LINE : 8,
       
		ALL_PET_NUM :  48,
        ALL_GENERAL: 80,
        ALL_GENERAL_HALF: 40,
 //       DIAMOND_CENTER_COL: ((6 - 1) >> 1),
        ///
        DRAW_LINE_TIME: 6,
        PET_FLASH_TIME: 20,

        GRID_WIDTH: 50,
        GRID_WIDTH_HALF: 25,
        GRID_HEIGHT: 45,
        GRID_HEIGHT_HALF: 22,
        
        OFFSET_X: OFFSET_X,
        OFFSET_Y: OFFSET_Y,
        DREAMPET_OFFSET_X: (OFFSET_X - 50),
        DREAMPET_OFFSET_Y: (OFFSET_Y - 45),
        // search flag
        SEARCH_NONE: 0,
        SEARCH_INIT: 1,
        SEARCH_ING: 2,
        SEARCH_FINISHED: 3,
        GAME_CLEAR_TIME : 1500,
       
  
        //Pet state
		DREAMPET_REMOVE : -1,
		DREAMPET_INIT : 0,
		DREAMPET_FOCUS : 1,
		DREAMPET_FLASH : 2,
		DREAMPET_FLASH_HINT : 3,
		DREAMPET_MOVING : 4,
		//Level hint number
		//LEVEL_HINT_NUMBER : [0, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6],
		LEVEL_HINT_NUMBER : [0, 1],//音乐开关，1为关，0为开
		//Total Levels
		MAX_LEVEL_RANK : 1,
        //Level time
//        LEVEL_TIME: [0, 18, 180, 180, 180, 180, 180, 180, 180,180,180 ],
        LEVEL_TIME: [0,40],
        //Level pet kinds
        LEVEL_PET_KIND: [5,25],
//        LEVEL_PET_KIND: [5, 3, 5, 5, 5, 5, 5, 5, 5,5,5 ],      
//        LEVEL_PET_KIND: [5, 31, 31, 31, 31, 31, 31, 31,31,31,31 ],       

		//animal.png
        PET_1: 0,
	    PET_2: 1,
	    PET_3: 2,
	    PET_4: 3,
	    PET_5: 4,
	    PET_6: 5,
	    PET_7: 6,
	    PET_8: 7,
	    PET_9: 8,
	    PET_10: 9,
	    PET_11: 10,
	    PET_12: 11,
	    PET_13: 12,
	    PET_14: 13,
	    PET_15: 14,
	    PET_16: 15,
	    PET_17: 16,
	    PET_18: 17,
	    PET_19: 18,
	    PET_20: 19,
	    PET_21: 20,
	    PET_22: 21,
	    PET_23: 22,
	    PET_24: 23,
	    PET_25: 24,
	    PET_26: 25,
	    PET_27: 26,
	    PET_28: 27,
	    PET_29: 28,
	    PET_30: 29,
	    PET_31: 30,
	    PET_32: 31,
	    PET_33: 32,
	    PET_34: 33,
	    PET_35: 34,
	    PET_36: 35,
	    PET_37: 36,
	    PET_38: 37,
	    PET_39: 38,
        PET_40: 39
    };  
})();