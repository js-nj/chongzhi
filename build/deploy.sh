#!/bin/bash 

echo '---- deploy start ----'

#判断根目录下的app_info.xml是否存在，若存在就放入打包中
if [ -f './app_info.xml' ]
then 
packageName=$1
mkdir $packageName
cp ./app_info.xml ${packageName}
else 
echo -e "\033[31m error: 根目录中缺少app_info.xml！请将app_info.xml放在根目录下后执行打包！ \033[0m"
exit 127
fi

packageName=$1
mkdir $packageName
touch ${packageName}/EMAP_APP
mkdir ${packageName}/classes
mkdir ${packageName}/lib
mkdir ${packageName}/web
mkdir ${packageName}/config

#判断根目录下的 permission.xml是否存在，若存在就放入打包中
if [ -f './permission.xml' ]
then 
packageName=$1
cp ./permission.xml ${packageName}/config
else 
echo -e "\033[31m error: 根目录中缺少permission.xml！请将permission.xml放在根目录下后执行打包！ \033[0m"
exit 127
fi

cp -R ./dist ${packageName}/web
cp -R ./static ${packageName}/web
cp ./index.html ${packageName}/web
cp -R ./com ${packageName}/classes
cp -R ./doc ${packageName}/


cd $packageName
zip -r ../${packageName}.zip ./*
cd ..
rm -rf ${packageName}

echo '---- deploy complete ----'
