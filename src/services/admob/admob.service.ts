import { Injectable } from "@angular/core";
import {
  AdMobFree,
  AdMobFreeRewardVideoConfig,
} from "@ionic-native/admob-free/ngx";
import { Platform } from "@ionic/angular";

@Injectable({
  providedIn: "root",
})
export class AdmobService {
  RewardVideoConfig: AdMobFreeRewardVideoConfig = {
    isTesting: true, // Supprimer cette ligne une fois en production
    autoShow: false,
    // id: "ca-app-pub-3940256099942544/5224354917", // ID d'une reward video que vous devez créer
  };
  constructor(private admobFree: AdMobFree, private platform: Platform) {
    this.platform.ready().then(() => {
      this.admobFree.rewardVideo.config(this.RewardVideoConfig);
      this.admobFree.rewardVideo
        .prepare()
        .then(() => {})
        .catch((e) => {
          alert(JSON.stringify(e));
        });
    });

    this.admobFree
      .on(this.admobFree.events.REWARD_VIDEO_CLOSE)
      .subscribe(() => {
        this.admobFree.rewardVideo
          .prepare()
          .then(() => {})
          .catch((e) => {
            alert(JSON.stringify(e));
          });
      });

    this.admobFree
      .on(this.admobFree.events.REWARD_VIDEO_REWARD)
      .subscribe((result) => {
        console.log(result.rewardAmount);
      });
  }

  showRewardVideoAd() {
    this.admobFree.rewardVideo
      .isReady()
      .then(() => {
        this.admobFree.rewardVideo
          .show()
          .then(() => {})
          .catch((e) => {
            alert(JSON.stringify(e));
          });
      })
      .catch((e) => {
        alert(JSON.stringify(e));
      });
  }
}
