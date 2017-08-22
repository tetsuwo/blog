---
layout: post
title: "iOS: SLServiceTypeFacebook で投稿内容がデフォルト設定できない"
date: 2016-10-18 00:00:00 +0900
categories: Facebook iOS
---


    NSString *message = @"Facebook Share Test";

    SLComposeViewController *composeViewController = [SLComposeViewController composeViewControllerForServiceType:SLServiceTypeFacebook];

    [composeViewController setCompletionHandler:^(SLComposeViewControllerResult result) {
        [self dismissViewControllerAnimated:YES completion:nil];
    }];
    
    [composeViewController setInitialText:message];

    [self presentViewController:composeViewController animated:YES completion:nil];


標準で組み込まれているダイアログでは投稿内容をデフォルト設定できなくなったようです。

FBSDKShareKit を使うと UI もほとんど変わらずに簡単に実装できます。

    NSString *url = @"https://example.com";

    FBSDKShareLinkContent *content = [[FBSDKShareLinkContent alloc] init];
    content.contentURL = [NSURL URLWithString: url];

    FBSDKShareDialog *dialog = [[FBSDKShareDialog alloc] init];
    dialog.fromViewController = self;
    dialog.shareContent = content;
    dialog.mode = FBSDKShareDialogModeShareSheet;
    dialog.delegate = nil;
    [dialog show];












### 参考 URL

- [iOS \- シェア機能](https://developers.facebook.com/docs/sharing/ios)
